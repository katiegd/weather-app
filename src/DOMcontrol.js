import { head } from "lodash";
import {
  getWeatherData,
  weatherConditionsMap,
  getWeatherForecast,
} from "./weather";
import searchIcon from "./assets/search.svg";
import beeIcon from "./assets/bee.svg";
import partlyCloudyDay from "./assets/partly-cloudy-day.svg";

export function DOMcontrol() {
  // Store current weather data
  let currentWeatherData = null;

  // Setup HTML elements
  const mainContainer = document.querySelector("#main-container");
  const headerContainer = document.querySelector(".header");

  const header = document.createElement("img");
  header.setAttribute("width", "100px");
  header.src = beeIcon;
  const headerName = document.createElement("header");
  headerName.textContent = "weather bee";

  const locationContainer = document.createElement("div");
  locationContainer.classList.add("location-container");

  const locationInput = document.createElement("input");
  locationInput.setAttribute("type", "text");
  locationInput.classList.add("location-input");

  const locationSubmit = document.createElement("img");
  locationSubmit.setAttribute("class", "submitBtn");
  locationSubmit.src = searchIcon;
  locationSubmit.setAttribute("width", "20px");

  const degressContainer = document.createElement("div");
  degressContainer.classList.add("degrees-container");

  const fButton = document.createElement("p");
  fButton.setAttribute("class", "farenheit-btn");
  fButton.classList.add("active");
  fButton.textContent = "°F/mph";

  const toggleDiv = document.createElement("div");
  toggleDiv.setAttribute("class", "metric-toggle-container");

  const toggleLabel = document.createElement("label");
  toggleLabel.setAttribute("class", "metric-toggle");

  const metricToggle = document.createElement("input");
  metricToggle.setAttribute("type", "checkbox");
  metricToggle.checked = false;
  metricToggle.setAttribute("id", "metric-toggle");

  const metricToggleCircle = document.createElement("div");
  metricToggleCircle.setAttribute("class", "circle");

  const cButton = document.createElement("p");
  cButton.setAttribute("class", "celsius-btn");
  cButton.textContent = "°C/kph";

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather-container");

  toggleLabel.appendChild(metricToggle);
  toggleLabel.appendChild(metricToggleCircle);

  toggleDiv.appendChild(toggleLabel);

  degressContainer.appendChild(fButton);
  degressContainer.appendChild(toggleDiv);
  degressContainer.appendChild(cButton);

  locationContainer.appendChild(locationInput);
  locationContainer.appendChild(locationSubmit);

  headerContainer.appendChild(header);
  headerContainer.appendChild(headerName);

  mainContainer.appendChild(headerContainer);
  mainContainer.appendChild(locationContainer);
  mainContainer.appendChild(degressContainer);
  mainContainer.appendChild(weatherContainer);

  // Toggle for metric and imperial conversions
  metricToggle.addEventListener("click", handleMetricToggle);

  // Event listeners for location inputs
  locationSubmit.addEventListener("click", handleInputSubmit);
  locationInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleInputSubmit();
    }
  });

  // Input submit handler. Grabs location input and passes through getWeatherData. Sets currentWeatherData to weatherData & renders the page with weatherData.
  function handleInputSubmit() {
    const locationInputText = locationInput.value;
    getWeatherData(locationInputText).then((weatherData) => {
      currentWeatherData = weatherData;
      renderWeather(weatherData);
    });
  }

  // Sets classes based on state of the toggle
  function handleMetricToggle() {
    if (metricToggle.checked === true) {
      metricToggleCircle.style.left = "20px";
      cButton.classList.add("active");
      fButton.classList.remove("active");
    } else {
      metricToggleCircle.style.left = "0px";
      fButton.classList.add("active");
      cButton.classList.remove("active");
    }
    if (currentWeatherData) {
      renderWeather(currentWeatherData);
    }
  }

  function getWeatherConditionStyle(condition, isDay) {
    const timeOfDay = isDay ? "day" : "night";
    return (
      weatherConditionsMap[condition]?.[timeOfDay] || {
        image: partlyCloudyDay,
      }
    );
  }

  // Render elements of weather data based on location
  function renderWeather(weatherData) {
    weatherContainer.innerHTML = "";

    const { condition, isDay } = weatherData;
    const { image } = getWeatherConditionStyle(condition, isDay);

    if (isDay === 0) {
      document.body.classList.add("night-mode");
      headerName.classList.add("night-mode");
      locationContainer.classList.add("night-mode");
      locationInput.classList.add("night-mode");
      locationSubmit.classList.add("night-mode");
      degressContainer.classList.add("night-mode");
      fButton.classList.add("night-mode");
      cButton.classList.add("night-mode");
      toggleLabel.classList.add("night-mode");
      weatherContainer.classList.add("night-mode");
    } else {
      document.body.classList.remove("night-mode");
      headerName.classList.remove("night-mode");
      locationContainer.classList.remove("night-mode");
      locationInput.classList.remove("night-mode");
      locationSubmit.classList.remove("night-mode");
      degressContainer.classList.remove("night-mode");
      fButton.classList.remove("night-mode");
      cButton.classList.remove("night-mode");
      toggleLabel.classList.remove("night-mode");
      weatherContainer.classList.remove("night-mode");
    }

    const conditionsImage = document.createElement("img");
    conditionsImage.setAttribute("width", "130px");
    conditionsImage.src = image;

    const locationInfoContainer = document.createElement("div");
    locationInfoContainer.classList.add("location-info-container");

    const locationHeader = document.createElement("p");
    locationHeader.classList.add("location-header");
    locationHeader.textContent = `${weatherData.locationName}, ${weatherData.locationRegion}`;

    const locationCountry = document.createElement("p");
    locationCountry.classList.add("location-country");
    locationCountry.textContent = `${weatherData.locationCountry}, Last Updated: ${weatherData.lastUpdated}`;

    const conditionsContainer = document.createElement("div");
    conditionsContainer.classList.add("conditions-container");

    const conditionsTextContainer = document.createElement("div");
    conditionsTextContainer.classList.add("conditions-text-container");

    const temperatureText = document.createElement("p");
    temperatureText.classList.add("temp-text");
    if (metricToggle.checked === true) {
      temperatureText.textContent = `${weatherData.tempC}°C`;
    } else {
      temperatureText.textContent = `${weatherData.tempF}°F`;
    }

    const conditions = document.createElement("p");
    conditions.classList.add("conditions-text");
    conditions.textContent = weatherData.condition;

    const maxMinTemp = document.createElement("p");
    maxMinTemp.classList.add("max-min-temp");
    maxMinTemp.textContent = `Hi: ${weatherData.maxTempF}°F, Low: ${weatherData.minTempF}°F`;

    const conditionsDetailsContainer = document.createElement("div");
    conditionsDetailsContainer.classList.add("conditions-details-container");

    const conditionsDetailsCategory = document.createElement("div");
    conditionsDetailsCategory.classList.add("conditions-details-category");

    const feelsLikeCategory = document.createElement("p");
    feelsLikeCategory.textContent = "Feels Like:";

    const humidityCategory = document.createElement("p");
    humidityCategory.textContent = "Humidity:";

    const windCategory = document.createElement("p");
    windCategory.textContent = "Wind:";

    const conditionsDetailsData = document.createElement("div");
    conditionsDetailsData.classList.add("conditions-details-data");

    const feelsLike = document.createElement("p");
    if (metricToggle.checked === true) {
      feelsLike.textContent = `${weatherData.feelsLikeC} °C`;
    } else {
      feelsLike.textContent = `${weatherData.feelsLikeF} °F`;
    }

    const humidity = document.createElement("p");
    humidity.textContent = `${weatherData.humidity}%`;

    const wind = document.createElement("p");
    if (metricToggle.checked === true) {
      wind.textContent = `${weatherData.windKph}kph ${weatherData.windDirection}`;
    } else {
      wind.textContent = `${weatherData.windMph}mph ${weatherData.windDirection}`;
    }

    locationInfoContainer.appendChild(locationHeader);
    locationInfoContainer.appendChild(locationCountry);

    conditionsTextContainer.appendChild(temperatureText);
    conditionsTextContainer.appendChild(conditions);
    conditionsTextContainer.appendChild(maxMinTemp);

    conditionsDetailsCategory.appendChild(feelsLikeCategory);
    conditionsDetailsCategory.appendChild(humidityCategory);
    conditionsDetailsCategory.appendChild(windCategory);

    conditionsDetailsData.appendChild(feelsLike);
    conditionsDetailsData.appendChild(humidity);
    conditionsDetailsData.appendChild(wind);

    conditionsDetailsContainer.appendChild(conditionsDetailsCategory);
    conditionsDetailsContainer.appendChild(conditionsDetailsData);

    conditionsContainer.appendChild(conditionsImage);
    conditionsContainer.appendChild(conditionsTextContainer);
    conditionsContainer.appendChild(conditionsDetailsContainer);

    weatherContainer.appendChild(locationInfoContainer);
    weatherContainer.appendChild(conditionsContainer);
  }

  // Renders a default location on page load
  function renderDefaultPage() {
    let location = "Raleigh";
    getWeatherData(location).then((weatherData) => {
      renderWeather(weatherData);
      currentWeatherData = weatherData;
    });
  }
  renderDefaultPage();
  let location = "Raleigh";
  getWeatherForecast(location);
}
