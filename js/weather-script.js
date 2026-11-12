const weatherContainer = document.getElementById("weather-container");
const currentConditions = document.getElementById("current-conditions");
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=41.904&longitude=-72.4698&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit";

function getCondition(code) {
  if (code >= 0 && code <= 1) {
    return { label: "Sunny", icon: "../assets/weather_icons/sunny-icon.png" };
  } else if (code >= 2 && code <= 3) {
    return { label: "Cloudy", icon: "../assets/weather_icons/clouds-icon.png" };
  } else if (code >= 40 && code <= 49) {
    return { label: "Fog", icon: "../assets/weather_icons/fog-icon.png" };
  } else if (code >= 50 && code <= 69) {
    return { label: "Rain", icon: "../assets/weather_icons/rain-icon.png" };
  } else if (code >= 70 && code <= 79) {
    return { label: "Snow", icon: "../assets/weather_icons/snow-icon.png" };
  } else if (code >= 80 && code <= 84) {
    return { label: "Showers", icon: "../assets/weather_icons/rain-icon.png" };
  } else if (code >= 85 && code <= 86) {
    return { label: "Snow showers", icon: "../assets/weather_icons/snow-icon.png" };
  } else if (code >= 95 && code <= 99) {
    return { label: "Thunderstorm", icon: "../assets/weather_icons/storm-icon.png" };
  }

  // Only runs if no range above matched
  return { label: "Cloudy", icon: "clouds-icon.png" };
}


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const maxWinds = data.daily.wind_speed_10m_max;
    // Current conditions for the hero
const currentTemp = data.current.temperature_2m;
const currentCode = data.current.weather_code;
const weatherCodes = data.daily.weather_code;
const currentCondition = getCondition(currentCode);
const nowHeading = document.createElement("h2");
nowHeading.textContent = "Current conditions";

const currentIcon = document.createElement("img");
currentIcon.src = "images/" + currentCondition.icon;
currentIcon.alt = currentCondition.label;
currentIcon.classList.add("current-icon");

const currentTempText = document.createElement("p");
currentTempText.textContent = Math.round(currentTemp) + "°F";
currentTempText.classList.add("current-temp");

const currentLabel = document.createElement("p");
currentLabel.textContent = currentCondition.label;
currentLabel.classList.add("current-label");

const todayWind = document.createElement("p");
todayWind.textContent = "Max wind today: " + maxWinds[0] + " mph";

currentConditions.appendChild(nowHeading);
currentConditions.appendChild(currentIcon);
currentConditions.appendChild(currentTempText);
currentConditions.appendChild(currentLabel);
currentConditions.appendChild(todayWind);


    for (let i = 0; i < dates.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");

      const date = document.createElement("h2");
      date.textContent = dates[i];

      const condition = getCondition(weatherCodes[i]);

const icon = document.createElement("img");
icon.src = "images/" + condition.icon;
icon.alt = condition.label;
icon.classList.add("condition-icon");

const conditionText = document.createElement("p");
conditionText.textContent = condition.label;
conditionText.classList.add("condition-label");

      const maxTemp = document.createElement("p");
      maxTemp.textContent = "High: " + maxTemps[i] + "°F";

      const minTemp = document.createElement("p");
      minTemp.textContent = "Low: " + minTemps[i] + "°F";

      const wind = document.createElement("p");
      wind.textContent = "Max wind: " + maxWinds[i] + " mph";

      card.appendChild(date);
      card.appendChild(icon);
      card.appendChild(maxTemp);
      card.appendChild(minTemp);
      card.appendChild(wind);

      weatherContainer.appendChild(card);
    }
  })
  .catch(error => {
    weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";
    console.error("Error fetching weather data:", error);
  });