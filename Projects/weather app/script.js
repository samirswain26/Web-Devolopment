document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "bbb195af794bab37f09ef1fab05b4ed8"; // Replace with your actual API key
    const button = document.querySelector("button");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    button.addEventListener("click", () => {
        const city = cityInput.value.trim(); // Get the city name from input

        if (city === "") {
            weatherInfo.innerHTML = "❌ Please enter a city name.";
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found! ❌");
                }
                return response.json();
            })
            .then(data => {
                const { name, main, weather } = data;
                weatherInfo.innerHTML = `
                    <h3>${name}</h3>
                    <p>🌡️ Temperature: ${main.temp}°C</p>
                    <p>🌪️ Condition: ${weather[0].description}</p>
                    <p>💧 Humidity: ${main.humidity}%</p>
                `;
            })
            .catch(error => {
                weatherInfo.innerHTML = error.message;
            });
    });
});