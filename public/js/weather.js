/*$.getJSON("http://api.ipstack.com/check?access_key=5448cfde5052f498a30a03b5055fdf3e&format=1", function(moreData){
    console.log(moreData);
    var city = moreData.city;
    var country = moreData.country_code;
    var state = moreData.region_code;
    $(".usercity").append(city);
    $(".country").append(country);
    $(".state").append(state);
});

$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=cuyahoga falls,oh,us&units=imperial&appid=568ed0d76658cf9e941fc1969416ddd5", function(data) {
 console.log(data);

 var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
 var temp = data.main.temp;
 var weather = data.weather[0].main;
 var city = data.name;

 $(".icon").attr("src", icon);
 $(".temp").append(Math.floor(temp));
 $(".weather").append(weather);
 $(".city").append(city);

});*/
(async () => {
  navigator.geolocation.getCurrentPosition(function(position))
  let { city: usercity, country_code: ocountry, region_code: state } = await (await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ position.coords.latitude +","+ position.coords.longitude + "&sensor=false").json();
  let weather_data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${usercity}, ${state}, ${ocountry}&units=imperial&appid=568ed0d76658cf9e941fc1969416ddd5`)).json();
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