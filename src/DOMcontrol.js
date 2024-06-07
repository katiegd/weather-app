import { head } from "lodash";
import { getWeatherData } from "./weather";
import searchIcon from "./assets/search.svg";
import beeIcon from "./assets/bee.svg";
import sunny from "./assets/sunny.svg";
import clearNight from "./assets/clear-night.svg";
import cloudy from "./assets/cloudy.svg";
import foggy from "./assets/foggy.svg";
import partlyCloudyDay from "./assets/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/partly-cloudy-night.svg";
import rain from "./assets/rain.svg";
import snowing1 from "./assets/snowing.svg";
import snowing2 from "./assets/snowy2.svg";
import storm from "./assets/storm.svg";
import windy from "./assets/windy.svg";

export function DOMcontrol() {
  let currentWeatherData = null;

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
  cButton.textContent = "°C/kmph";

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

  metricToggle.addEventListener("click", handleMetricToggle);

  locationSubmit.addEventListener("click", handleInputSubmit);
  locationInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleInputSubmit();
    }
  });

  function handleInputSubmit() {
    const locationInputText = locationInput.value;
    getWeatherData(locationInputText).then((weatherData) => {
      currentWeatherData = weatherData;
      renderWeather(weatherData);
    });
  }

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

  function renderWeather(weatherData) {
    weatherContainer.innerHTML = "";

    const conditionsImage = document.createElement("img");
    conditionsImage.setAttribute("width", "130px");
    conditionsImage.src = sunny;

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
      temperatureText.textContent = `${weatherData.tempC} °C`;
    } else {
      temperatureText.textContent = `${weatherData.tempF} °F`;
    }

    const conditions = document.createElement("p");
    conditions.classList.add("conditions-text");
    conditions.textContent = weatherData.condition;

    const conditionsDetailsContainer = document.createElement("div");
    conditionsDetailsContainer.classList.add("conditions-details-container");

    const feelsLike = document.createElement("p");
    if (metricToggle.checked === true) {
      feelsLike.textContent = `Feels Like: ${weatherData.feelsLikeC} °C`;
    } else {
      feelsLike.textContent = `Feels Like: ${weatherData.feelsLikeF} °F`;
    }

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${weatherData.humidity}%`;

    const wind = document.createElement("p");
    if (metricToggle.checked === true) {
      wind.textContent = `Wind: ${weatherData.windKph}kmph ${weatherData.windDirection}`;
    } else {
      wind.textContent = `Wind: ${weatherData.windMph}mph ${weatherData.windDirection}`;
    }

    locationInfoContainer.appendChild(locationHeader);
    locationInfoContainer.appendChild(locationCountry);

    conditionsTextContainer.appendChild(temperatureText);
    conditionsTextContainer.appendChild(conditions);

    conditionsDetailsContainer.appendChild(feelsLike);
    conditionsDetailsContainer.appendChild(humidity);
    conditionsDetailsContainer.appendChild(wind);

    conditionsContainer.appendChild(conditionsImage);
    conditionsContainer.appendChild(conditionsTextContainer);
    conditionsContainer.appendChild(conditionsDetailsContainer);

    weatherContainer.appendChild(locationInfoContainer);
    weatherContainer.appendChild(conditionsContainer);
  }

  function renderDefaultPage() {
    let location = "Raleigh";
    getWeatherData(location).then((weatherData) => {
      renderWeather(weatherData);
      currentWeatherData = weatherData;
    });
  }
  renderDefaultPage();
}
