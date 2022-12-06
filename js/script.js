//Variables initializing elements
let fetchApiEl = document.getElementById("searchBtn");
let cityNameEl = document.getElementById("cityName");
let tempEl = document.querySelectorAll(".temp");
let windEl = document.querySelectorAll(".wind");
let humidityEl = document.querySelectorAll(".humidity");
let weatherIcon = document.getElementsByTagName("i");
let dateNameEl = document.getElementsByTagName("h5");
let todayTempEl = document.getElementById("temp");
let todayWindEl = document.getElementById("wind");
let todayHumidityEl = document.getElementById("humidity");
let today = new Date();
let futureDate = document.querySelectorAll("#futureDate");
let weeklyDates = document.getElementById("#date");

// Retrieves Api and user input to generate specific information..
// i.e: "Temp, Humidity, Wind" and displays it on main date card.
function getTodaysWeather(city) {
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiKey = "&units=imperial&appid=23f9da5dbc0ab14e23dcf698ead515e0";
  let result = api + city + apiKey;

  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      todayTempEl.innerHTML = ` Temperature: ${data.main.temp} `;
      todayWindEl.innerHTML = ` Wind speed: ${data.wind.speed}`;
      todayHumidityEl.innerHTML = ` Humidity: ${data.main.humidity} % `;
      weatherIcon[0].innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png' />`;
    });
}
// Retrieves weather for the week and assigns temp, humidity, wind, and current weather icon
function getWeeklyWeather(city) {
  let api = "http://api.openweathermap.org/data/2.5/forecast?q=";
  let apiKey = "&units=imperial&appid=23f9da5dbc0ab14e23dcf698ead515e0";
  let result = api + city + apiKey;

  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      tempEl[0].textContent = ` Temp : ${data.list[2].main.temp}`;
      windEl[0].textContent = ` Wind : ${data.list[2].wind.speed}`;
      humidityEl[0].textContent = ` Humidity : ${data.list[2].main.humidity} %`;
      dateNameEl[0].textContent = data.list[2].dt_txt;
      // This places icon code in icon section
      // It starts with index one because 0 is for the "current day weather above"
      weatherIcon[1].innerHTML = `<img src='http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png' />`;
      tempEl[1].textContent = ` Temp : ${data.list[10].main.temp}`;
      windEl[1].textContent = ` Wind : ${data.list[10].wind.speed} mph`;
      humidityEl[1].textContent = ` Humidity : ${data.list[10].main.humidity} %`;
      dateNameEl[1].textContent = data.list[10].dt_txt;
      weatherIcon[2].innerHTML = `<img src='http://openweathermap.org/img/wn/${data.list[10].weather[0].icon}.png' />`;
      tempEl[2].textContent = ` Temp : ${data.list[18].main.temp}`;
      windEl[2].textContent = ` Wind : ${data.list[18].wind.speed} mph`;
      humidityEl[2].textContent = ` Humidity : ${data.list[18].main.humidity} %`;
      dateNameEl[2].textContent = data.list[18].dt_txt;
      weatherIcon[3].innerHTML = `<img src='http://openweathermap.org/img/wn/${data.list[18].weather[0].icon}.png' />`;
      tempEl[3].textContent = ` Temp : ${data.list[26].main.temp}`;
      windEl[3].textContent = ` Wind : ${data.list[26].wind.speed} mph`;
      humidityEl[3].textContent = ` Humidity : ${data.list[26].main.humidity} %`;
      dateNameEl[3].textContent = data.list[26].dt_txt;
      weatherIcon[4].innerHTML = `<img src='http://openweathermap.org/img/wn/${data.list[26].weather[0].icon}.png' />`;
      tempEl[4].textContent = ` Temp : ${data.list[34].main.temp}`;
      windEl[4].textContent = ` Wind : ${data.list[34].wind.speed} mph`;
      humidityEl[4].textContent = ` Humidity : ${data.list[34].main.humidity} %`;
      dateNameEl[4].textContent = data.list[34].dt_txt;
      weatherIcon[5].innerHTML = `<img src='http://openweathermap.org/img/wn/${data.list[34].weather[0].icon}.png' />`;
    });
}
//Assigns user input to city variable fires get weather function
//Displays user input on main date card
//Stores search in local storage
function userInput() {
  const city = searchBar.value;
  getWeeklyWeather(city);
  getTodaysWeather(city);
  cityNameEl.textContent = `${city} ${today.toLocaleDateString()}`;
  setIntoStorage();
  setButtonValues();
}
// sets user input into local storage as on object of arrays
function setIntoStorage() {
  let city = [{ cityName: searchBar.value }];
  localStorage.setItem("previousCities", JSON.stringify(previousCities));
  previousCities.push(city);
  // console.log(previousCities);
}

// Allows us to display to previous searched cities
const previousCities = JSON.parse(localStorage.getItem("previousCities")) || [];
// Sets button values from storage data. uses map to pull data from string
function setButtonValues() {
  let buttonEl = document.getElementsByTagName("button");
  let cityButtonName = JSON.parse(localStorage.getItem("previousCities"));
  // turns inner html into storage data
  buttonEl[1].textContent = cityButtonName
    .at(-1)
    // buttonEl[1].innerHTML = Object.values(previousCities.at(-1))
    .map((city) => {
      return city.cityName;
    })
    .join("");

  buttonEl[2].textContent = cityButtonName
    .at(-2)
    .map((city) => {
      return city.cityName;
    })
    .join("");

  buttonEl[3].textContent = cityButtonName
    .at(-3)
    .map((city) => {
      return city.cityName;
    })
    .join("");

  buttonEl[4].textContent = cityButtonName
    .at(-4)
    .map((city) => {
      return city.cityName;
    })
    .join("");

  buttonEl[5].textContent = cityButtonName
    .at(-5)
    .map((city) => {
      return city.cityName;
    })
    .join("");
}
// Retrieves item from local storage and sets it to button text value
fetchApiEl.addEventListener("click", function () {
  userInput();
});