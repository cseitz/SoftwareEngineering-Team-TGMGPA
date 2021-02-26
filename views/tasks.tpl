% include("header.tpl")
% include("banner.tpl")

<style lang="scss">
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

{{! component('archives.js') }}
{{! component('api.js') }}
<span id="templates" hidden>
  {{! component('task.html') }}
</span>

{{! component('modal.html') }}

{{! component('tasklist.html') }}

% include("footer.tpl")
