import axios from "axios";

const CITY_ID = "1835848";
const API_KEY = process.env.REACT_APP_API_KEY;

export function getWeather() {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}`)
    .then((response) => {
      const weather = response.data.weather[0].main;
      return weather;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getWeatherIcon(weather) {
  let icon;
  switch (weather) {
    case "Clear":
      icon = "☀️";
      break;
    case "Clouds":
      icon = "☁️";
      break;
    case "Mist":
      icon = "☁️";
      break;
    case "Rain":
      icon = "☔️";
      break;
    case "Snow":
      icon = "❄️";
      break;
    default:
      icon = "";
      break;
  }
  return icon;
}