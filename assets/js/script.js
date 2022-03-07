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
        // display data from API
        return response.json();
    }).then(function(data) {
        console.log(data);
        // create variables for data
        var temp = data.main.temp;
        // convert temp to fahrenheit
        var tempF = Math.round((temp - 273.15) * 1.8 + 32);
        var wind = data.wind.speed;
        var humidity = data.main.humidity;
        var icon = data.weather[0].icon;
        var cityName = data.name;
        var date = moment().format("MMMM Do YYYY");
        // not working as expected
        var tempEl = $("li").text("Temp:" + tempF + " F");
        console.log(tempEl);
        // append temp to current day container
        currentDayContainer.append(tempEl);
        currentDayContainer.append(date);
    });

};

// add event listener to the search button
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // call the function to get current day weather stats
    getCurrentDay();
})