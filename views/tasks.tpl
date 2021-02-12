% include("header.tpl")
% include("banner.tpl")

<style>
  .save_edit, .undo_edit, .move_task, .description, .edit_task, .delete_task {
    cursor: pointer;
  }
  .completed {text-decoration: line-through;}
  .description { padding-left:8px }
</style>

<div class="w3-row">
  <div class="w3-col s6 w3-container w3-topbar w3-bottombar w3-leftbar w3-rightbar w3-border-white">
    <div class="w3-row w3-xxlarge w3-bottombar w3-border-black w3-margin-bottom">
      <h1><i>Today</i></h1>
    </div>
    <table id="task-list-today" class="w3-table">
    </table>
    <div class="w3-row w3-bottombar w3-border-black w3-margin-bottom w3-margin-top"></div>
  </div>
  <div class="w3-col s6 w3-container w3-topbar w3-bottombar w3-leftbar w3-rightbar w3-border-white">
    <div class="w3-row w3-xxlarge w3-bottombar w3-border-black w3-margin-bottom">
      <h1><i>Tomorrow</i></h1>
    </div>
    <table  id="task-list-tomorrow" class="w3-table">
    </table>
    <div class="w3-row w3-bottombar w3-border-black w3-margin-bottom w3-margin-top"></div>
  </div>
</div>
<input id="current_input" hidden value=""/> 
<script>

/* API CALLS */

function api_get_tasks(success_function) {
  $.ajax({url:"api/tasks", type:"GET", 
          success:success_function});
}

function api_create_task(task, success_function) {
  console.log("creating task with:", task)
  $.ajax({url:"api/tasks", type:"POST", 
          data:JSON.stringify(task), 
          contentType:"application/json; charset=utf-8",
          success:success_function});
}

function api_update_task(task, success_function) {
  console.log("updating task with:", task)
  task.id = parseInt(task.id)
  $.ajax({url:"api/tasks", type:"PUT", 
          data:JSON.stringify(task), 
          contentType:"application/json; charset=utf-8",
          success:success_function});
}

function api_delete_task(task, success_function) {
  console.log("deleting task with:", task)
  task.id = parseInt(task.id)
  $.ajax({url:"api/tasks", type:"DELETE", 
          data:JSON.stringify(task), 
          contentType:"application/json; charset=utf-8",
          success:success_function});
}

/* KEYPRESS MONITOR */

function input_keypress(event) {
  if (event.target.id != "current_input") {
    $("#current_input").val(event.target.id)
  }
  id = event.target.id.replace("input-","");
  $("#filler-"+id).prop('hidden', true);
  $("#save_edit-"+id).prop('hidden', false);
  $("#undo_edit-"+id).prop('hidden', false);
}

/* EVENT HANDLERS */

function move_task(event) {
  if ($("#current_input").val() != "") { return }
  console.log("move item", event.target.id )
  id = event.target.id.replace("move_task-","");
  target_list = event.target.className.search("today") > 0 ? "tomorrow" : "today";
  api_update_task({'id':id, 'list':target_list},
                  function(result) { 
                    console.log(result);
                    get_current_tasks();
                  } );
}

function complete_task(event) {
  if ($("#current_input").val() != "") { return }
  console.log("complete item", event.target.id )
  id = event.target.id.replace("description-","");
  completed = event.target.className.search("completed") > 0;
  console.log("updating :",{'id':id, 'completed':completed==false})
  api_update_task({'id':id, 'completed':completed==false}, 
                  function(result) { 
                    console.log(result);
                    get_current_tasks();
                  } );
}

function edit_task(event) {
  if ($("#current_input").val() != "") { return }
  console.log("edit item", event.target.id)
  id = event.target.id.replace("edit_task-","");
  // move the text to the input editor
  $("#input-"+id).val($("#description-"+id).text());
  // hide the text display
  $("#move_task-"+id).prop('hidden', true);
  $("#description-"+id).prop('hidden', true);
  $("#edit_task-"+id).prop('hidden', true);
  $("#delete_task-"+id).prop('hidden', true);
  // show the editor
  $("#editor-"+id).prop('hidden', false);
  $("#save_edit-"+id).prop('hidden', false);
  $("#undo_edit-"+id).prop('hidden', false);
  // set the editing flag
  $("#current_input").val(event.target.id)
}

function save_edit(event) {
  console.log("save item", event.target.id)
  id = event.target.id.replace("save_edit-","");
  console.log("desc to save = ",$("#input-" + id).val())
  if ((id != "today") & (id != "tomorrow")) {
    api_update_task({'id':id, description:$("#input-" + id).val()},
                    function(result) { 
                      console.log(result);
                      get_current_tasks();
                      $("#current_input").val("")
                    } );
  } else {
    api_create_task({description:$("#input-" + id).val(), list:id},
                    function(result) { 
                      console.log(result);
                      get_current_tasks();
                      $("#current_input").val("")
                    } );
  }
}

function undo_edit(event) {
  id = event.target.id.replace("undo_edit-","")
  console.log("undo",[id])
  $("#input-" + id).val("");
  if ((id != "today") & (id != "tomorrow")) {
    // hide the editor
    $("#editor-"+id).prop('hidden', true);
    $("#save_edit-"+id).prop('hidden', true);
    $("#undo_edit-"+id).prop('hidden', true);
    // show the text display
    $("#move_task-"+id).prop('hidden', false);
    $("#description-"+id).prop('hidden', false);
    $("#filler-"+id).prop('hidden', false);
    $("#edit_task-"+id).prop('hidden', false);
    $("#delete_task-"+id).prop('hidden', false);
  }
  // set the editing flag
  $("#current_input").val("")
}

function delete_task(event) {
  if ($("#current_input").val() != "") { return }
  console.log("delete item", event.target.id )
  id = event.target.id.replace("delete_task-","");
  api_delete_task({'id':id},
                  function(result) { 
                    console.log(result);
                    get_current_tasks();
                  } );
}

function display_task(x) {
  arrow = (x.list == "today") ? "arrow_forward" : "arrow_back";
  completed = x.completed ? " completed" : "";
  if ((x.id == "today") | (x.id == "tomorrow")) {
    t = '<tr id="task-'+x.id+'" class="task">' +
        '  <td style="width:36px"></td>' +  
        '  <td><span id="editor-'+x.id+'">' + 
        '        <input id="input-'+x.id+'" style="height:22px" class="w3-input" '+ 
        '          type="text" autofocus placeholder="Add an item..."/>'+
        '      </span>' + 
        '  </td>' +
        '  <td style="width:72px">' +
        '    <span id="filler-'+x.id+'" class="material-icons">more_horiz</span>' + 
        '    <span id="save_edit-'+x.id+'" hidden class="save_edit material-icons">done</span>' + 
        '    <span id="undo_edit-'+x.id+'" hidden class="undo_edit material-icons">cancel</span>' +
        '  </td>' +
        '</tr>';
  } else {
    t = '<tr id="task-'+x.id+'" class="task">' + 
        '  <td><span id="move_task-'+x.id+'" class="move_task '+x.list+' material-icons">' + arrow + '</span></td>' +
        '  <td><span id="description-'+x.id+'" class="description' + completed + '">' + x.description + '</span>' + 
        '      <span id="editor-'+x.id+'" hidden>' + 
        '        <input id="input-'+x.id+'" style="height:22px" class="w3-input" type="text" autofocus/>' +
        '      </span>' + 
        '  </td>' +
        '  <td>' +
        '    <span id="edit_task-'+x.id+'" class="edit_task '+x.list+' material-icons">edit</span>' +
        '    <span id="delete_task-'+x.id+'" class="delete_task material-icons">delete</span>' +
        '    <span id="save_edit-'+x.id+'" hidden class="save_edit material-icons">done</span>' + 
        '    <span id="undo_edit-'+x.id+'" hidden class="undo_edit material-icons">cancel</span>' +
        '  </td>' +
        '</tr>';
  }
  $("#task-list-" + x.list).append(t);
  $("#current_input").val("")
}

function get_current_tasks() {
  // remove the old tasks
  $(".task").remove();
  // display the new task editor
  display_task({id:"today", list:"today"})
  display_task({id:"tomorrow", list:"tomorrow"})
  // display the tasks
  api_get_tasks(function(result){
    for (const task of result.tasks) {
      display_task(task);
    }
    // wire the response events 
    $(".move_task").click(move_task);
    $(".description").click(complete_task)
    $(".edit_task").click(edit_task);
    $(".save_edit").click(save_edit);
    $(".undo_edit").click(undo_edit);
    $(".delete_task").click(delete_task);
    // set all inputs to set flag
    $("input").keypress(input_keypress);
  });
}

$(document).ready(function() {
  get_current_tasks()
});

</script>
% include("footer.tpl")
