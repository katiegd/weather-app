export async function getWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=3af326277f9b4956958210506240306&q=${location}&aqi=no`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);

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
    };
  } catch (error) {
    console.log(error);
  }
}

export const conditionsMap = {};
