# SWIFT Taskbook
# Web Application for Task Management

# system libraries
import os

# web transaction objects
from bottle import request, response

# HTML request types
from bottle import route, get, put, post, delete, redirect

# web page template processor
from bottle import template

# static file serving
from bottle import static_file

VERSION = 0.1

#email = "shared@example.com"

# development server
PYTHONANYWHERE = ("PYTHONANYWHERE_SITE" in os.environ)

if PYTHONANYWHERE:
    from bottle import default_app
else:
    from bottle import run

def read_file(path):
    output = ''
    with open(path,'r') as f:
        output += f.read()
    return output



import sass, re
def compile_sass(str):
    if str:
        if len(str) <= 3:
            return str
        else:
            return sass.compile(string=str)
    return str
def compile_sass_file(path):
    compiled = ''
    try:
        compiled = compile_sass(read_file(path))
    except sass.CompileError as e:
        print('FAILED TO COMPILE', path)
        print(e)
        compiled = ''
    return compiled
def compile_sass_tag(str):
    def replacer(match):
        if match.group(0)[0:11] == '<style lang':
            #print(match.string)
            compiled = ''
            try:
                compiled = '<style>' + compile_sass(match.group(0)[len(match.group(1)):][:-2]) + '</'
            except sass.CompileError as e:
                print('FAILED TO COMPILE', str)
                print(e)
                compiled = match.string
            return compiled
        return match.string
    return re.sub('(<style lang="scss">)(.|\n)+?(?=(style))', replacer, str)

# compile_sass_tag(open('./components/task.html').read())

# Static File Including
from bottle import BaseTemplate
def include_file(path):
    return compile_sass_tag(read_file(path))
def include_component(path):
    ext = os.path.splitext(path)[1]
    contents = read_file('./components/' + path)
    if ext == '.js':
        return '<script>' + contents + '</script>'
    return contents
BaseTemplate.defaults["file"] = include_file
BaseTemplate.defaults["component"] = include_component

# ---------------------------
# web application routes
# ---------------------------

@route('/')
@route('/tasks')
def tasks():
    #print(template("tasks.tpl"))
    #return template("tasks.tpl")
    return compile_sass_tag(template('tasks.tpl'))


@route('/login')
def login():
    return compile_sass_tag(template("login.tpl"))


@route('/register')
def login():
    return compile_sass_tag(template("register.tpl"))

@route('/about')
def about():
    return compile_sass_tag(template("about.tpl"))


# ---------------------------
# database
# ---------------------------

import json
import dataset
import time
import bcrypt

taskbook_db = dataset.connect('sqlite:///taskbook.db')

@get('/api/version')
def get_version():
    return {"version": VERSION}

# ---------------------------
# account REST api
# ---------------------------

@get('/api/session')
def get_account():
    session = request.get_cookie('taskbook_session')
    if session:
        if len(session) == 40:
            account_table = taskbook_db.get_table('account')
            user = account_table.find_one(session=session)
            if user:
                user.pop('password')
                return user
    return False
    #return bytes(os.urandom(20)).hex()

@post('/api/login')
def login_account():
    email = request.forms.get('email')
    password = request.forms.get('password')
    if len(email) <= 3 or len(password) <= 3:
        return redirect('/login')
    account_table = taskbook_db.get_table('account')
    user = account_table.find_one(email=email)
    if user:
        if bcrypt.checkpw(str.encode(password), user["password"]):
            token = bytes(os.urandom(20)).hex()
            response.set_cookie('taskbook_session', token, path='/')
            data = dict(email=user["email"], session=token)
            account_table.update(data, ['email'])
            return redirect('/')
    return redirect('/login')

@get('/api/logout')
def logout_account():
    user = get_account()
    if user:
        account_table = taskbook_db.get_table('account')
        data = dict(email=user["email"], session="")
        account_table.update(data, ['email'])
        response.set_cookie('taskbook_session', '', expires=0, path='/')
        return redirect('/login')
    return redirect('/login')

@get('/logout')
def logout_account2():
    return logout_account();

@post('/api/signup')
def create_account():
    name = request.forms.get('name')
    email = request.forms.get('email')
    password = request.forms.get('password')
    if len(email) <= 3 or len(password) <= 3 or len(name) <= 1:
        return redirect('/register')
    account_table = taskbook_db.get_table('account')
    user = account_table.find_one(email=email)
    if not user:
        data = dict(email=email, name=name, password=bcrypt.hashpw(str.encode(password), bcrypt.gensalt()), session='')
        account_table.insert(data)
        return login_account()
    return redirect('/register')

@get('/api/session2')
def get_account2():
    what = get_account()
    print(what)
    return what



# ---------------------------
# task REST api
# ---------------------------

@get('/api/tasks')
def get_tasks():
    """return a list of tasks sorted by submit/modify time"""
    user = get_account()
    if not user:
        return False
    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache'
    task_table = taskbook_db.get_table('task')
    tasks = [dict(x) for x in task_table.find(email=user["email"], order_by='time')]
    for x in tasks:
        x.pop('email', None)
    return {"tasks": tasks}


@post('/api/tasks')
def create_task():
    """create a new task in the database"""
    user = get_account()
    if not user:
        return False
    try:
        data = request.json
        for key in data.keys():
            assert key in ["name", "day", "description", "color", "completed", "date", "time"], f"Illegal key '{key}'"
        assert type(data['name']) is str, "name is not a string."
        assert len(data['name'].strip()) > 0, "name is length zero."
        assert data['day'] in ["today", "tomorrow"], "day must be 'today' or 'tomorrow'"
        assert len(data['color']) == 7, "The color must be in the format #XXXXXX"
        assert data['color'][0] == '#', "The color must be in the format #XXXXXX"
        #assert len(data['date']) == 25, "The date must be in the format yyyy-MM-ddThh:mm"
    except Exception as e:
        response.status = "400 Bad Request:" + str(e)
        return
    try:
        task_table = taskbook_db.get_table('task')
        task_table.insert({
            "time": time.time(),
            "name": data['name'].strip(),
            "description": data['description'].strip(),
            "day": data['day'],
            "email": user["email"],
            "completed": False,
            "color": data['color'], #"#ffffff",
            "date": data['date']
        })
    except Exception as e:
        response.status = "409 Bad Request:" + str(e)
    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({'status': 200, 'success': True})


@put('/api/tasks')
def update_task():
    """update properties of an existing task in the database"""
    user = get_account()
    if not user:
        return False
    try:
        data = request.json
        for key in data.keys():
            assert key in ["id", "name", "completed", "day", "color", "description", "subtasks", "time", "date"], f"Illegal key '{key}'"
        assert type(data['id']) is int, f"id '{id}' is not int"
        if "name" in request:
            assert type(data['name']) is str, "name is not a string."
            assert len(data['name'].strip()) > 0, "name is length zero."
        if "completed" in request:
            assert type(data['completed']) is bool, "Completed is not a bool."
        if "day" in request:
            assert data['day'] in ["today", "tomorrow"], "day must be 'today' or 'tomorrow'"
        if "color" in request:
            assert len(data['color']) == 7, "The color must be in the format #XXXXXX"
            assert data['color'][0] == '#', "The color must be in the format #XXXXXX"
        #if "date" in request:
            #assert len(data['date']) == 25, "The date must be in the format yyyy-MM-ddThh:mm"
    except Exception as e:
        response.status = "400 Bad Request:" + str(e)
        return
    data['email'] = user["email"]
    if 'day' in data:
        data['time'] = time.time()
    try:
        task_table = taskbook_db.get_table('task')
        task_table.update(row=data, keys=['id'])
    except Exception as e:
        response.status = "409 Bad Request:" + str(e)
        return
    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({'status': 200, 'success': True})


@delete('/api/tasks')
def delete_task():
    """delete an existing task in the database"""
    user = get_account()
    if not user:
        return False
    try:
        data = request.json
        assert type(data['id']) is int, f"id '{id}' is not int"
    except Exception as e:
        response.status = "400 Bad Request:" + str(e)
        return
    try:
        task_table = taskbook_db.get_table('task')
        task_table.delete(email=user["email"], id=data['id'])
    except Exception as e:
        response.status = "409 Bad Request:" + str(e)
        return
    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({'success': True})



# Serve static files
# THIS ROUTE SHOULD BE THE LAST ONE, AS IT IS A WILDCARD
import os
useCache = False
cached_files = {

}


@get('/<filepath:path>')
def server_static(filepath):
    ext = os.path.splitext(filepath)[1]
    if ext == '.scss':
        response.content_type = "text/css"
        if useCache:
            if cached_files.get(filepath, False):
                return cached_files[filepath]
            else:
                cached_files[filepath] = compile_sass_file('./public/' + filepath)
                return cached_files[filepath]
        else:
            return compile_sass_file('./public/' + filepath)
    return static_file(filepath, root='./public')

import platform

if PYTHONANYWHERE:
    application = default_app()
elif platform.node() == 'ubuntu-s-1vcpu-1gb-nyc3-01':
    if __name__ == "__main__":
        run(host='localhost', port=6590, debug=True)
else:
   if __name__ == "__main__":
       run(host='0.0.0.0', port=os.environ.get('PORT', 8080), debug=False)
