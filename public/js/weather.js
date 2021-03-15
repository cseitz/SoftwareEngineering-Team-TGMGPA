var geocoder;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();



  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         alert(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
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
