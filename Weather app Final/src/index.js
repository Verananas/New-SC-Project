// Day & Time
let dateElement = document.querySelector("#date");
let currentTime = new Date();

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

dateElement.innerHTML = formatDate(currentTime);
//END of  Day & Time

//Search input
function showtemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = `Weather in ${response.data.name}`;
  document.querySelector("#temperature").innerHTML = `${Math.round(response.data.main.temp)}°C`;

  document.querySelector("#feeling").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed)} m/s`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity)} %`;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
 
}


//END of Search input

//Temp C to F - vice versa
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${66}°F`;
}
let convertTemptoFahrenheitButton = document.querySelector("#fahrenheit-link");
convertTemptoFahrenheitButton.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${25}°C`;
}
let convertTempToCelciusButton = document.querySelector("#celcius-link");
convertTempToCelciusButton.addEventListener("click", convertToCelcius);
//END of Temp C to F

//Current location
function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appi=${apiKey}&units=metric`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  console.log(apiUrl);
  axios.get(apiUrl).then(showtemperature);

}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationBtn = document.querySelector("#location-button");
currentLocationBtn.addEventListener("click", getPosition);

//END - Current location

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Amsterdam");
