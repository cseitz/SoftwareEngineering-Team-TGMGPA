var usercity;
var country;
var state;

$.getJSON("http://api.ipstack.com/check?access_key=5448cfde5052f498a30a03b5055fdf3e&format=1", function(moreData){
    console.log(moreData);
    usercity = moreData.city;
    country = moreData.country_code;
    state = moreData.region_code;
    $(".usercity").append(usercity);
    $(".country").append(country);
    $(".state").append(state);
});

$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + usercity + "," + state + "," + country + "&units=imperial&appid=568ed0d76658cf9e941fc1969416ddd5", function(data) {
 console.log(data);

 var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
 var temp = data.main.temp;
 var weather = data.weather[0].main;
 var city = data.name;

 $(".icon").attr("src", icon);
 $(".temp").append(Math.floor(temp));
 $(".weather").append(weather);
 $(".city").append(city);

});