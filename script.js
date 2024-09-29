const search = document.querySelector(".search-box button");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

// Will be called from the html form element
const handleSubmit = (event) => {
  event.preventDefault();
  const city = document.querySelector(".search-box input").value;
  fetchWeatherData(city);
};

const fetchWeatherData = async (cityName) => {
  const API_KEY = "fb8c1046c94dd1cf66917a73687a0b24";

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
  );
  const result = await res.json();
  console.log(result);

  updateUi(result, cityName);
};

const updateUi = (weatherData, city) => {
  // set city name
  const cityBox = document.querySelector(".search-box input");
  cityBox.value = weatherData.name;

  if (weatherData.cod === "404") {
    cityHide.textContent = city;
    container.style.height = "400px";
    weatherBox.classList.remove("active");
    weatherDetails.classList.remove("active");
    error.classList.add("active");
    return;
  }

  // Elements for weather details
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  if (cityHide.textContent === city) {
    return;
  } else {
    cityHide.textContent = city;

    container.style.height = "555px";
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    error.classList.remove("active");

    // Update weather image
    switch (weatherData.weather[0].main) {
      case "Clear":
        image.src = "images/clear.webp";
        break;
      case "Rain":
        image.src = "images/rain.webp";
        break;
      case "Snow":
        image.src = "images/snow.webp";
        break;
      case "Clouds":
        image.src = "images/cloud.webp";
        break;
      case "Mist":
      case "Haze":
        image.src = "images/mist.webp";
        break;
      default:
        image.src = "images/cloud.webp";
    }

    // Update temperature, humidity, wind, and description
    temperature.innerHTML = `${parseInt(
      weatherData.main.temp
    )}<span>\u00B0C</span>`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.wind.speed}km/h`;
    description.innerHTML = `${weatherData.weather[0].description}`;

    // Cloning weather, humidity, and wind elements
    const infoWeather = document.querySelector(".info-weather ");
    const infoHumidity = document.querySelector(".info-humidity ");
    const infoWind = document.querySelector(".info-wind ");

    const elCloneInfoWeather = infoWeather.cloneNode(true);
    const elCloneInfoHumidity = infoHumidity.cloneNode(true);
    const elCloneInfoWind = infoWind.cloneNode(true);

    elCloneInfoWeather.id = "clone-info-weather";
    elCloneInfoWeather.classList.add("active-clone");

    elCloneInfoHumidity.id = "clone-info-humidity";
    elCloneInfoHumidity.classList.add("active-clone");

    elCloneInfoWind.id = "clone-info-wind";
    elCloneInfoWind.classList.add("active-clone");

    setTimeout(() => {
      infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
      infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
      infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
    }, 220);

    // Query all clones
    const cloneInfoWeather = document.querySelectorAll(
      ".info-weather.active-clone"
    );
    const totalCloneInfoWeather = cloneInfoWeather.length;
    const cloneInfoWeatherFirst = cloneInfoWeather[0];

    const cloneInfoHumidity = document.querySelectorAll(
      ".info-humidity.active-clone"
    );
    const cloneInfoHumidityFirst = cloneInfoHumidity[0];

    const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");
    const cloneInfoWindFirst = cloneInfoWind[0];

    // Remove old clones
    if (totalCloneInfoWeather > 0) {
      cloneInfoWeatherFirst.classList.remove("active-clone");
      cloneInfoHumidityFirst.classList.remove("active-clone");
      cloneInfoWindFirst.classList.remove("active-clone");

      setTimeout(() => {
        cloneInfoWeather[0].remove();
        cloneInfoHumidity[0].remove();
        cloneInfoWind[0].remove();
      }, 1220);
    }
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation api");
  }
};
const onSuccess = (position) => {
  const { latitude, longitude } = position.coords;
  const API_KEY = "fb8c1046c94dd1cf66917a73687a0b24";
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      updateUi(data);
      console.log(data);
    });
};
const onError = (error) => {
  alert("Unable to retrieve your location");
};
getLocation();
