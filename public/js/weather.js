window.onload = function Myfunction(){
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function(position){
          (async() => {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            let weather_data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=568ed0d76658cf9e941fc1969416ddd5`)).json();
            let icon = `https://openweathermap.org/img/w/${weather_data.weather[0].icon}.png`;
            let { main: { temp }, name: city, sys: { country } } = weather_data;
            let weather = weather_data.weather[0].main;

            //$(".state").append(state);
            $(".icon").attr("src", icon);
            $(".temp").text(Math.floor(temp));
            $(".weather").text(weather);
            //$(".city").append(city);
            //$(".country").append(country);
            console.log(weather_data);
          })();
          console.log(position);
        });
    else
        console.log("geolocation is not supported");
}