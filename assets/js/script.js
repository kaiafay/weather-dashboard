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
var previousSearch = JSON.parse(localStorage.getItem("searched"));

if(previousSearch) {
    searchHistory = previousSearch;
};

// display the search history on the page
var displayHistory = function() {
    var div = $("<div>");
    // for loop that creates buttons for each search history item
    for (var i=0; i < searchHistory.length; i++) {
        var row = $("<row>");
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-secondary btn-lg btn-block col-12");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        row.append(btn)
        div.append(row);
    };

    // display buttons on the html page
    $("#search-history").append(div);
};

displayHistory();

var getCurrentDay = function(city) {
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

var displayCurrentDay = function(data) {
    // create variables for data
    var temp = data.main.temp;
    // convert temp to fahrenheit and format it
    var tempF = "Temp: " + Math.round((temp - 273.15) * 1.8 + 32) + " ??F";
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
        console.log(response);
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
    // set variable for forecast API URL
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(forecastURL).then(function(response) {
        if(response.ok) {
            return response.json().then(function(data) {
            console.log(data);
            displayForecast(data);
        });
        } else {
            alert("Error: " + response.statusText)
        }
    });
};

var displayForecast = function(data) {
    // set variables for dates
    var date1 = new moment().add(1, 'day').format("L");
    var date2 = new moment().add(2, 'day').format("L");
    var date3 = new moment().add(3, 'day').format("L");
    var date4 = new moment().add(4, 'day').format("L");
    var date5 = new moment().add(5, 'day').format("L");

    // create icons for weather
    var iconURL1 = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    var weatherIcon1 = document.createElement("img");
    weatherIcon1.setAttribute("src", iconURL1);
    var iconURL2 = `https://openweathermap.org/img/wn/${data.list[9].weather[0].icon}@2x.png`;
    var weatherIcon2 = document.createElement("img");
    weatherIcon2.setAttribute("src", iconURL2);
    var iconURL3 = `https://openweathermap.org/img/wn/${data.list[17].weather[0].icon}@2x.png`;
    var weatherIcon3 = document.createElement("img");
    weatherIcon3.setAttribute("src", iconURL3);
    var iconURL4 = `https://openweathermap.org/img/wn/${data.list[25].weather[0].icon}@2x.png`;
    var weatherIcon4 = document.createElement("img");
    weatherIcon4.setAttribute("src", iconURL4);
    var iconURL5 = `https://openweathermap.org/img/wn/${data.list[33].weather[0].icon}@2x.png`;
    var weatherIcon5 = document.createElement("img");
    weatherIcon5.setAttribute("src", iconURL5);

    // set variables for temp
    var temp1 = data.list[0].main.temp;
    var temp2 = data.list[9].main.temp;
    var temp3 = data.list[17].main.temp;
    var temp4 = data.list[25].main.temp;
    var temp5 = data.list[33].main.temp;

    // set variables for wind
    var wind1 = data.list[0].wind.speed;
    var wind2 = data.list[9].wind.speed;
    var wind3 = data.list[17].wind.speed;
    var wind4 = data.list[25].wind.speed;
    var wind5 = data.list[33].wind.speed;

    // set variables for humidity
    var humidity1 = data.list[0].main.humidity;
    var humidity2 = data.list[9].main.humidity;
    var humidity3 = data.list[17].main.humidity;
    var humidity4 = data.list[25].main.humidity;
    var humidity5 = data.list[33].main.humidity;

    // append day one info to div
    $("#day-one").append($("<h5>").html(date1));
    $("#day-one").append(weatherIcon1);
    $("#day-one").append($("<p>").html("Temp: " + temp1 + "  ??F"));
    $("#day-one").append($("<p>").html("Wind: " + wind1 + " MPH"));
    $("#day-one").append($("<p>").html("Humidity: " + humidity1 + "%"));

    // append day two info to div
    $("#day-two").append($("<h5>").html(date2));
    $("#day-two").append(weatherIcon2);
    $("#day-two").append($("<p>").html("Temp: " + temp2 + "  ??F"));
    $("#day-two").append($("<p>").html("Wind: " + wind2 + " MPH"));
    $("#day-two").append($("<p>").html("Humidity: " + humidity2 + "%"));

    // append day three info to div
    $("#day-three").append($("<h5>").html(date3));
    $("#day-three").append(weatherIcon3);
    $("#day-three").append($("<p>").html("Temp: " + temp3 + "  ??F"));
    $("#day-three").append($("<p>").html("Wind: " + wind3 + " MPH"));
    $("#day-three").append($("<p>").html("Humidity: " + humidity3 + "%"));

    // append day four info to div
    $("#day-four").append($("<h5>").html(date4));
    $("#day-four").append(weatherIcon4);
    $("#day-four").append($("<p>").html("Temp: " + temp4 + "  ??F"));
    $("#day-four").append($("<p>").html("Wind: " + wind4 + " MPH"));
    $("#day-four").append($("<p>").html("Humidity: " + humidity4 + "%"));

    // append day five info to div
    $("#day-five").append($("<h5>").html(date5));
    $("#day-five").append(weatherIcon5);
    $("#day-five").append($("<p>").html("Temp: " + temp5 + "  ??F"));
    $("#day-five").append($("<p>").html("Wind: " + wind5 + " MPH"));
    $("#day-five").append($("<p>").html("Humidity: " + humidity5 + "%"));

};

// create a function that clears previous data one element at a time
var clearData = function() {
    $("#date").text("Current Day:");
    $("#city-icon").empty();
    $("#temp").empty();
    $("#wind").empty();
    $("#humidity").empty();
    $("#uv-index").empty();
    $(".forecast").empty();

    uvi.classList.remove("btn-warning");
    uvi.classList.remove("btn-success");
    uvi.classList.remove("btn-danger");
};

// add event listener to the search button
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // save searched cities to the search history array
    var search = cityInput.value;
    searchHistory.push(search);
    
    // limit search history length to 5
    if(searchHistory.length > 5) {
        searchHistory.shift();
    };

    // save array to local storage as a string
    localStorage.setItem("searched", JSON.stringify(searchHistory));
    // empty search history container
    $('#search-history').empty();
    displayHistory();
   
    // call the function to get current day weather stats
    getCurrentDay(search);
    getForecast(search);
    // clear search input
    cityInput.value = '';
});

// add event listener to the search history buttons
searchHistoryContainer.addEventListener('click', function(event) {

    var btn = event.target
    var search = btn.getAttribute("data-search");
    getCurrentDay(search);
    getForecast(search);
});
