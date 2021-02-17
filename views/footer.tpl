<i id="dark-mode-icon" class="material-icons dark_mode_switch" onclick='toggle_darkmode()' title="Dark Mode">dark_mode</i>
<i id="light-mode-icon" class="material-icons dark_mode_switch" onclick='toggle_darkmode()' title="Light Mode" hidden>light_mode</i>
</body>

<script>
    function toggle_darkmode() {
        $('#light-mode-icon').toggle()
        $('#dark-mode-icon').toggle();
        darkmode.toggle();
    }
</script>

</html>

