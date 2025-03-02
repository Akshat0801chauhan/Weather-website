const apiKey = "048be6b376f040d9ac5133757250203";
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city);
    
    if (response.status == 400) { // WeatherAPI returns 400 for bad request
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/hr";

        const condition = data.current.condition.text;
        if (condition.includes("Clouds")) {
            weatherIcon.src = "images/clouds.png";
        } else if (condition.includes("Clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (condition.includes("Rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (condition.includes("Drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } else if (condition.includes("Mist")) {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
