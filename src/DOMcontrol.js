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

  const fButton = document.createElement("button");
  fButton.setAttribute("class", "farenheit-btn");
  fButton.textContent = "°F";

  const cButton = document.createElement("button");
  cButton.setAttribute("class", "celsius-btn");
  cButton.textContent = "°C";

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather-container");

  degressContainer.appendChild(fButton);
  degressContainer.appendChild(cButton);

  locationContainer.appendChild(locationInput);
  locationContainer.appendChild(locationSubmit);

  headerContainer.appendChild(header);
  headerContainer.appendChild(headerName);

  mainContainer.appendChild(headerContainer);
  mainContainer.appendChild(locationContainer);
  mainContainer.appendChild(degressContainer);
  mainContainer.appendChild(weatherContainer);

  locationSubmit.addEventListener("click", handleInputSubmit);
  locationInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleInputSubmit();
    }
  });

  function handleInputSubmit() {
    const locationInputText = locationInput.value;
    getWeatherData(locationInputText).then((weatherData) => {
      renderWeather(weatherData);
    });
  }

  function renderWeather(weatherData) {
    weatherContainer.innerHTML = "";

    const conditionsImage = document.createElement("img");
    conditionsImage.setAttribute("width", "80%");
    conditionsImage.src = sunny;

    const locationHeader = document.createElement("h1");
    locationHeader.textContent = `${weatherData.locationName}, ${weatherData.locationRegion}`;

    const temperatureText = document.createElement("h2");
    temperatureText.textContent = `${weatherData.tempF} °F`;

    const conditions = document.createElement("h2");
    conditions.textContent = weatherData.condition;

    weatherContainer.appendChild(conditionsImage);
    weatherContainer.appendChild(locationHeader);
    weatherContainer.appendChild(temperatureText);
    weatherContainer.appendChild(conditions);
  }

  function renderDefaultPage() {
    let location = "Durham";
    getWeatherData(location).then((weatherData) => {
      renderWeather(weatherData);
    });
  }
  renderDefaultPage();
}
