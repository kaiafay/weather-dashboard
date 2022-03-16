// pull HTML elements using the DOM
var cityInput = document.getElementById("city");
var searchBtn = document.getElementById("submit-search");
var currentDayContainer = document.getElementById("current-day");
var searchHistoryContainer = document.getElementById("search-history");
var forecastContainer = document.getElementById("forecast");
var uvi = document.getElementById("uv-index")

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
            alert("Error: " + response.statusText)
        }
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
    var iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", iconURL)

    // get lat and lon for UVI
    var latlonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=924c79f0f636f17fd8929bb3a3510184";
    fetch(latlonURL).then(function(response) {
        return response.json().then(function(data) {
            uvi.append("UV Index: " + data.current.uvi);
              
    // style UVI
    if (data.current.uvi < 3) {
        uvi.classList.add("btn-success");
    } else if (data.current.uvi < 7) {
        uvi.classList.remove("btn-success");
        uvi.classList.add("btn-warning");
    } else if (data.current.uvi >= 7) {
        uvi.classList.remove("btn-warning");
        uvi.classList.remove("btn-success");
        uvi.classList.add("btn-danger");
    };
        });
    });

    clearData();
    // append date to h3 element
    $("#date").append(" " + date);
    // append city name and icon to h4 element
    $("#city-icon").append(cityName);
    $("#city-icon").append(weatherIcon);
    // append temp to temp li element
    $("#temp").append(tempF);
    // append wind to wind li element
    $("#wind").append("Wind: " + wind + " MPH");
    // // append humidity to humidity li element
    $("#humidity").append("Humidity: " + humidity + "%");
};

var getForecast = function(city) {
    city = $("#city").val();

    // set variable for forecast API URL
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=" + apiKey; // api key not working?
    fetch(forecastURL).then(function(response) {
        if(response.ok) {
            return response.json().then(function(data) {
            console.log(data);
        });
        } else {
            alert("Error: " + response.statusText)
        }
    });
};

// create a function that clears previous data one element at a time
var clearData = function() {
    $("#date").text("Current Day:");
    $("#city-icon").empty();
    $("#temp").empty();
    $("#wind").empty();
    $("#humidity").empty();
    $("#uv-index").empty();
};

// add event listener to the search button
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // call the function to get current day weather stats
    getCurrentDay();
    getForecast();
    // clear search input
    cityInput.value = '';
});
