document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "bbb195af794bab37f09ef1fab05b4ed8"; // Replace with your actual API key
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    // Function to fetch weather data
    async function fetchWeather(city) {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error("City not found! Please try again.");
            }
            
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherInfo.innerHTML = `❌ ${error.message}`;
        }
    }

    // Function to display weather data
    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        const iconCode = weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
        // Prepare precaution message
        let precautionMessage = '';
        if (main.temp > 30) {
            precautionMessage = `
                <div class="precaution" style="margin-top: 1rem; padding: 1rem; background: #ffe3e3; border-left: 5px solid #e74c3c; color: #c0392b; border-radius: 5px;">
                    <strong>⚠️ It's very hot outside!</strong>
                    <ul style="text-align: left; margin-top: 0.5rem;">
                        <li>Stay hydrated 💧</li>
                        <li>Avoid direct sunlight ☀️</li>
                        <li>Wear light and breathable clothing 👕</li>
                        <li>Use sunscreen if stepping out 🧴</li>
                    </ul>
                </div>
            `;
        }
    
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h3>${name}</h3>
                <img src="${iconUrl}" alt="${weather[0].description}">
                <p>🌡️ Temperature: ${main.temp}°C (Feels like ${main.feels_like}°C)</p>
                <p>☁️ Condition: ${weather[0].description}</p>
                <p>💧 Humidity: ${main.humidity}%</p>
                <p>📊 Pressure: ${main.pressure} hPa</p>
                <p>🌬️ Wind: ${wind.speed} m/s</p>
                ${precautionMessage}
            </div>
        `;
    }
    
    // Handle button click
    window.getWeather = function() {
        const city = cityInput.value.trim();
        
        if (city === "") {
            weatherInfo.innerHTML = "❌ Please enter a city name.";
            return;
        }
        
        weatherInfo.innerHTML = "Loading...";
        fetchWeather(city);
    };

    // Allow pressing Enter key to fetch weather
    cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            getWeather();
        }
    });
});