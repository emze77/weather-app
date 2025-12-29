import "./styles.css";

const KEY = "8ZEHRVSX432KVXEJU54Z4SUYU";
const sendButton = document.querySelector("#send-location-btn");
const inputField = document.querySelector("#location-input");
const outputCurrentWeather = document.querySelector("#output__current-weather");
const outputChanceOfRain = document.querySelector("#output__chance-of-rain");

sendButton.addEventListener("click", () => {
  const location = inputField.value;
  getWeather(location, KEY).then((result) => splitWeatherData(result));
});


function splitWeatherData (weather) {
  const chanceOfRain = weather.days[0].precipprob;
  const tempFahr = weather.days[0].temp;
  console.log(tempFahr)
  const celsius = (tempFahr - 32 ) / (9/5);

  outputCurrentWeather.textContent = `${Math.round(celsius)}°C`;
  outputChanceOfRain.textContent = chanceOfRain;



}

// const chanceOfRain = weather.days[0].precipprob;

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/londen

// API format: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY

async function getWeather(location, key) {
  const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

  try {
    const response = await fetch(link);
    const weather = await response.json();
    console.table(weather.days[0].precipprob);
    return weather;
  } catch (err) {
    console.log(`vc-err-response: ${err}`);
  }
}
