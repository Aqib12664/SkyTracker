
    console.log("Code is being initialized");

const search = document.querySelector(".search-box button");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIkey = "fb8c1046c94dd1cf66917a73687a0b24";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then((response) => response.json())
    .then((json) => {
      // If city is not found
      if (json.cod === "404") {
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
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Clouds":
            image.src = "images/cloud.png";
            break;
          case "Mist":
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "images/cloud.png";
        }

        // Update temperature, humidity, wind, and description
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>\u00B0C</span>`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed}km/h`;
        description.innerHTML = `${json.weather[0].description}`;

        // Cloning weather, humidity, and wind elements
        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

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
        }, 2200);

        // Query all clones
        const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
        const totalCloneInfoWeather = cloneInfoWeather.length;

        const cloneInfoHumidity = document.querySelectorAll(".info-humidity.active-clone");
        const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");

        // Remove old clones
        if (totalCloneInfoWeather > 0) {
          cloneInfoWeather[0].classList.remove("active-clone");
          cloneInfoHumidity[0].classList.remove("active-clone");
          cloneInfoWind[0].classList.remove("active-clone");

          setTimeout(() => {
            cloneInfoWeather[0].remove();
            cloneInfoHumidity[0].remove();
            cloneInfoWind[0].remove();
          }, 2200);
        }
      }
    });
});


 