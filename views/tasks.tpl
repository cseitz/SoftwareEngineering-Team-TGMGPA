% include("header.tpl")
% include("banner.tpl")

<style>
    .save_edit, .undo_edit, .move_task, .description, .edit_task, .delete_task {
        cursor: pointer;
    }

    .completed {
        text-decoration: line-through;
    }

    .description {
        padding-left: 8px
    }

    .white_text {
        color: #ffffff;
    }

    .black_text {
        color: #000000;
    }

</style>

<span id="templates" hidden>
  {{! component('task.html') }}
</span>

{{! component('tasklist.html') }}

% include("footer.tpl")
