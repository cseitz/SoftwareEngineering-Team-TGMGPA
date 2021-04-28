% include("header.tpl")
% include("banner.tpl")
<div class="about">
    <h1 style="text-align: center; text-decoration: underline;">ABOUT</h1>
    <div class = "light-dark">
      <b style="font-size: 20px;">The icons below are used in the nav bar located above</b>
      <p>The Sun button will put your taskbook in light mode:   <i class ="material-icons">light_mode</i></p>
      <p>The Moon button will put your taskbook in dark mode:   <i class ="material-icons">dark_mode</i></p>
    </div>
    <div class = "taskbook-icons">
      <b style="font-size: 20px;">The icons below are used on the main taskbook page</b>
      <p>The plus button adds a new task under the day:   <i class ="material-icons">add</i></p>
      <p>The double check mark button completes all tasks that are currently active during that day:   <i class ="material-icons">done_all</i></p>
    </div>
    <div class = "tasks-icons">
      <b style="font-size: 20px;">The icons below are used for specific tasks</b>
      <p>The color block next to each task allows the user to change the color to help better organize their tasks:   <i class ="material-icons">format_color_fill</i></p>
      <p>The arrow buttons are used to move the task to the TODAY or TOMORROW section:   <i class ="material-icons">arrow_forward</i> or <i class ="material-icons">arrow_back</i></p>
      <p>The pencil button is used to edit a task:   <i class ="material-icons">edit</i></p>
      <p>The trashcan button is used to delete a task:   <i class ="material-icons">delete</i></p>
      <p>The single checkmark button will complete a task:   <i class ="material-icons">done</i></p>
    </div>
</div>

<style>
    .about{
        background-color: rgba(128,128,128,.1);
        margin: auto;
        width: 50%;
        text-align:center;
        padding: 5px;
        border-radius: 1.5vh;
        .p{
        text-align: center;
        }
    }
</style>
% include("footer.tpl")
