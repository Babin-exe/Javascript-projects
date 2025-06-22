const apiKey = "27ebf844d667c94fce7e726a0ea49354";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".windspeed").innerHTML =
      data.wind.speed + " Km / Hr";

    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rainy.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Thunderstorm":
        weatherIcon.src = "images/thunderstorm.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Mist":
      case "Haze":
      case "Fog":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/default.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.log("Error fetching weather:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(search.value);
});

search.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(search.value);
  }
});
