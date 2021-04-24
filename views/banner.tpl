<div class="w3-container w3-black banner" style="margin: 10px; border-radius: 0.5em;">
  <span class="w3-xxxlarge w3-margin"><b>Taskbook2</b>
    <span class="weather-container">
     <span class="temp"></span>
     <img class="icon">
     <span class="weather"></span>
     <!--<span class="city"></span>
     <span class= "state"></span>
     <span class= "country"></span>-->
    </span>
  </span>
  <span class="w3-right" hidden>
    <span class="w3-large w3-button w3-margin w3-round-large w3-blue">zzzSign up</span>
    <span class="w3-large w3-button w3-margin w3-round-large w3-blue">Log In</span>
    <span class="w3-large w3-button w3-margin w3-round-large w3-blue">Log Out</span>
  </span>
  <button id="theme-toggle" class="material-icons dark-mode-switch" onclick="darkmode.toggle()">dark_mode</button>
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
