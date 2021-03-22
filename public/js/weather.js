$('#location-button').click(function(){
  if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
      });
  else
      console.log("geolocation is not supported");
});



(async () => {
  let { city: usercity, country_code: ocountry, region_code: state } = await (await fetch('http://api.ipstack.com/check?access_key=5448cfde5052f498a30a03b5055fdf3e&format=1')).json();
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