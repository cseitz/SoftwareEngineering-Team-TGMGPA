function Myfunction(){
  $("#location-button").click(function(){
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function(position){
          console.log(position);
        });
    else
        console.log("geolocation is not supported");
  });
(async () => {
  var lat = Myfunction.coords.latitude;
  var lon = Myfunction.coords.longitude;
  let weather_data = await (await fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=568ed0d76658cf9e941fc1969416ddd5`)).json();
  let icon = `https://openweathermap.org/img/w/${weather_data.weather[0].icon}.png`;
  let { main: { temp }, name: city, sys: { country } } = weather_data;
  let weather = weather_data.weather[0].main;

  //$(".state").append(state);
  $(".icon").attr("src", icon);
  $(".temp").append(Math.floor(temp));
  $(".weather").append(weather);
  //$(".city").append(city);
  //$(".country").append(country);
})();
}