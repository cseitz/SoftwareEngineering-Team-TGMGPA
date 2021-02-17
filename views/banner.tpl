<div class="w3-container w3-topbar w3-leftbar w3-rightbar w3-border-white w3-black banner">
  <span class="w3-xxxlarge w3-margin"><b>Taskbook</b></span>
  <span class="w3-right" hidden>
    <span class="w3-large w3-button w3-margin w3-round-large w3-blue">zzzSign up</span>
    <span class="w3-large w3-button w3-margin w3-round-large w3-blue">Log In</span>
    <span class="w3-large w3-button w3-margin w3-round-large w3-blue">Log Out</span>
  </span>
  <i id="dark-mode-icon" class="material-icons dark_mode_switch" onclick='toggle_darkmode()' title="Dark Mode">dark_mode</i>
  <i id="light-mode-icon" class="material-icons dark_mode_switch" onclick='toggle_darkmode()' title="Light Mode">light_mode</i>
</div>

<script>
  function toggle_darkmode() {
        $('#light-mode-icon').toggle()
        $('#dark-mode-icon').toggle();
        darkmode.toggle();
    }
</script>

