// pull HTML elements using the DOM
var cityInput = document.getElementById("city");
var searchBtn = document.getElementById("submit-search");
var currentDayContainer = document.getElementById("current-day");
var searchHistoryContainer = document.getElementById("search-history");
var forecastContainer = document.getElementById("forecast");

// global variables
var apiURL = 'http://api.openweathermap.org/'; 
var apiKey = '924c79f0f636f17fd8929bb3a3510184';
var searchHistory = [];

// display the search history on the page
var displayHistory = function() {
    searchHistoryContainer.innerHTML = '';
};

var getCurrentDay = function(city) {
    // set city variable to city input value
    city = $("#city").val();

    // set variable for current day API URL
    var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(currentDayURL).then(function(response) {
        // check to see if response is successful
        if(response.ok) {
            return response.json().then(function(data) {
            console.log(data);
            displayCurrentDay(data);
        });
        } else {
            alert("Error:" + response.statusText)
        }
    })
    .catch(function (error) {
        alert("Unable to connect to OpenWeather!");
    }); 
};

var displayCurrentDay = function (data) {
    // create variables for data
    var temp = data.main.temp;
    // convert temp to fahrenheit and format it
    var tempF = "Temp: " + Math.round((temp - 273.15) * 1.8 + 32) + " °F";
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var cityName = data.name;
    var date = moment().format("MMMM Do, YYYY");

    // create icon image
    var iconURL = "https://openweathermap.org/img/w/${weather.weather[0].icon}.png"; // url is not working
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", iconURL)
    // append date to h3 element
    $("#date").append(" " + date);
    // append city name and icon to h4 element
    $("#city-icon").append(cityName + " " + weatherIcon);
    // append temp to temp li element
    $("#temp").append(tempF);
    // append wind to wind li element
    $("#wind").append("Wind: " + wind + " MPH");
    // append humidity to humidity li element
    $("#humidity").append("Humidity: " + humidity + "%");
};
// add event listener to the search button
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // call the function to get current day weather stats
    getCurrentDay();
})