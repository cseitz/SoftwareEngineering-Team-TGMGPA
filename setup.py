import dataset
import bcrypt

install_requires=[
    'libsass'
]

if __name__ == "__main__":
    taskbook_db = dataset.connect('sqlite:///taskbook.db')
    task_table = taskbook_db.get_table('task')
    task_table.drop()
    task_table = taskbook_db.create_table('task')
    task_table.insert_many([
        {"time": 0.0, "name": "Do something useful", "day": "today", "email": "shared@example.com", "completed": True, "color": "#ffffff", "date": ""},
        {"time": 0.5, "name": "Do something fantastic", "day": "today", "email": "shared@example.com", "completed": False, "color": "#ffffff", "date": ""},
        {"time": 0.3, "name": "Do something remarkable", "day": "tomorrow", "email": "shared@example.com", "completed": False, "color": "#ffffff", "date": ""},
        {"time": 0.7, "name": "Do something unusual", "day": "tomorrow", "email": "shared@example.com", "completed": True, "color": "#ffffff", "date": ""}
    ])
    account_table = taskbook_db.get_table('account')
    account_table.drop()
    account_table = taskbook_db.create_table('account')
    #password = bcrypt.hashpw(b"test", bcrypt.gensalt())
    password = bcrypt.hashpw(str.encode("test"), bcrypt.gensalt())
    account_table.insert_many([
        {"email":"shared@example.com", "name": "John Doe", "password": password}
    ])
    user = account_table.find_one(email='shared@example.com')
    print(user)
    if bcrypt.checkpw(str.encode("test"), user["password"]):
        print("Password matches!")
    else:
        print("BCRYPT Not Properly Implemented!!!")
    if not bcrypt.checkpw(str.encode("test2"), user["password"]):
        print("Password correctly doesn't match!")
    else:
        print("BCRYPT Not Properly Implemented!!! Incorrect password returned true!")
