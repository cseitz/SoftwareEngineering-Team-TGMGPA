<div class="w3-container w3-black banner" style="margin: 10px; border-radius: 0.5em;">
  <span class="">
    <span class="weather-container">
     <span class="temp"></span>
     <img class="icon">
     <span class="weather"></span>
     <!--<span class="city"></span>
     <span class= "state"></span>
     <span class= "country"></span>-->
    </span>
  </span>
  <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/tasks">Taskbook</a>
  <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/about">About</a>
  <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/settings">Settings</a>
  <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/login">Login</a>
  <button id="theme-toggle" class="material-icons dark-mode-switch" onclick="darkmode.toggle()">dark_mode</button>
</div>
<div hidden>
    <span>
        <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/tasks">Taskbook</a>
        <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/about">About</a>
        <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/settings">Settings</a>
        <a class="w3-large w3-button w3-margin w3-round-large w3-black" href="/login">Login</a>
  </span>
</div>

<style>

.dark-mode-switch {
  color: white;
  border: none;
  background: none!important;
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  font-size: 2em;
  outline: none;
  cursor: pointer;
  transition: transform 0.15s;
}
.dark-mode-switch:hover {
  transform: scale(1.25);
}

</style>
