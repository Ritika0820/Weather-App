const API_KEY = `6943dafbf93616687ae0638ae073b8aa`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

const getWeatherByCoordinates = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  showWeather(data);
};

const showWeather = (data) => {
  console.log(data);
  weather.innerHTML = ` <div>
  <h3 style="margin-bottom: 10px;">📍 ${data.name}, ${data.sys.country}</h3>
                    <img src="https://openweathermap.org/img/wn/${
                      data.weather[0].icon
                    }@2x.png" alt=" "${data.weather[0].description}"">
      </div>
      <div class= "weather-info">
      <h2>${data.main.temp}°C</h2>
      <h4>${data.weather[0].main}</h4>
      <p>🌡️ Feels like: ${data.main.feels_like}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
           <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      <p>📈 Pressure: ${data.main.pressure} hPa</p>
      <p>🌇 Visibility: ${data.visibility / 1000} km</p>
                </div>`;
};

window.addEventListener("load", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to fetch your location. Please search manually.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  getWeather(search.value);
});
