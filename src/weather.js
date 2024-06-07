import sunny from "./assets/sunny.svg";
import clearNight from "./assets/clear-night.svg";
import cloudy from "./assets/cloudy.svg";
import cloudyNight from "./assets/cloudy-night.svg";
import foggy from "./assets/foggy.svg";
import foggyNight from "./assets/foggy-night.svg";
import partlyCloudyDay from "./assets/partly-cloudy-day.svg";
import partlyCloudyNight from "./assets/partly-cloudy-night.svg";
import rain from "./assets/rain.svg";
import rainNight from "./assets/rain-night.svg";
import lightSnowDay from "./assets/snowing.svg";
import lightSnowNight from "./assets/light-snow-night.svg";
import heavySnowDay from "./assets/snowy2.svg";
import heavySnowNight from "./assets/heavy-snow-night.svg";
import storm from "./assets/storm.svg";
import stormNight from "./assets/storm-night.svg";
import windy from "./assets/windy.svg";

export async function getWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=3af326277f9b4956958210506240306&q=${location}&aqi=no`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const locationName = weatherData.location.name;
    const locationRegion = weatherData.location.region;
    const locationCountry = weatherData.location.country;
    const tempF = weatherData.current.temp_f;
    const tempC = weatherData.current.temp_c;
    const feelsLikeF = weatherData.current.feelslike_f;
    const feelsLikeC = weatherData.current.feelslike_c;
    const windDirection = weatherData.current.wind_dir;
    const windMph = weatherData.current.wind_mph;
    const windKph = weatherData.current.wind_kph;
    const condition = weatherData.current.condition.text;
    const lastUpdated = weatherData.current.last_updated;
    const humidity = weatherData.current.humidity;
    const isDay = weatherData.current.is_day;

    return {
      tempF,
      condition,
      tempC,
      locationName,
      locationRegion,
      locationCountry,
      feelsLikeC,
      feelsLikeF,
      windDirection,
      windMph,
      windKph,
      lastUpdated,
      humidity,
      isDay,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getWeatherForecast(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=3af326277f9b4956958210506240306&q=${location}&days=5&aqi=no&alerts=no`,
      { mode: "cors" }
    );
    const forecastData = await response.json();

    console.log(forecastData);
  } catch (error) {
    console.log(error);
  }
}

// Object map containing different styles based on weather/time of day.
export const weatherConditionsMap = {
  Sunny: {
    day: {
      image: sunny,
    },
    night: {
      image: clearNight,
    },
  },
  "Partly cloudy": {
    day: {
      image: partlyCloudyDay,
    },
    night: {
      image: partlyCloudyNight,
    },
  },
  Cloudy: {
    day: {
      image: cloudy,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: cloudyNight,
    },
  },
  Overcast: {
    day: {
      image: cloudy,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: cloudyNight,
    },
  },
  Mist: {
    day: {
      image: cloudy,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: cloudyNight,
    },
  },
  "Patchy rain possible": {
    day: {
      image: rain,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: rainNight,
    },
  },
  "Patchy snow possible": {
    day: {
      image: lightSnowDay,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: lightSnowNight,
    },
  },
  "Patchy sleet possible": {
    day: {
      image: lightSnowDay,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: lightSnowNight,
    },
  },
  "Patchy freezing drizzle possible": {
    day: {
      image: lightSnowDay,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: lightSnowNight,
    },
  },
  "Thundery outbreaks possible": {
    day: {
      image: storm,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: stormNight,
    },
  },
  "Blowing snow": {
    day: {
      image: heavySnowDay,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: heavySnowNight,
    },
  },
  Blizzard: {
    day: {
      image: heavySnowDay,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: heavySnowNight,
    },
  },
  Fog: {
    day: {
      image: foggy,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: foggyNight,
    },
  },
  "Patchy light drizzle": {
    day: {
      image: rain,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: rainNight,
    },
  },
  "Light drizzle": {
    day: {
      image: rain,
      background: "linear-gradient(to top, #e2ffe3, #000",
    },
    night: {
      image: rainNight,
    },
  },
};
