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
