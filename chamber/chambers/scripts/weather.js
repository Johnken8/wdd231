// Weather functionality with OpenWeatherMap API
document.addEventListener('DOMContentLoaded', function() {
    // Replace with your OpenWeatherMap API key
    const apiKey = 'YOUR_API_KEY';
    // Abuja coordinates - you would use coordinates for your specific chamber location
    const lat = 9.0765;
    const lon = 7.3986;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;

    // For development/testing without an API key, use mock data
    const mockWeatherData = {
        current: {
            temp: 32,
            weather: [
                {
                    description: "partly cloudy",
                    icon: "02d"
                }
            ]
        },
        daily: [
            {
                dt: Date.now() / 1000 + 86400,
                temp: {
                    day: 33
                },
                weather: [{ icon: "01d" }]
            },
            {
                dt: Date.now() / 1000 + 172800,
                temp: {
                    day: 31
                },
                weather: [{ icon: "02d" }]
            },
            {
                dt: Date.now() / 1000 + 259200,
                temp: {
                    day: 30
                },
                weather: [{ icon: "10d" }]
            }
        ]
    };

    // Function to update weather display with API data
    function updateWeatherDisplay(data) {
        // Current weather
        const currentTemp = document.getElementById('current-temp');
        const weatherIcon = document.getElementById('weather-icon');
        const weatherDesc = document.getElementById('weather-desc');
        
        currentTemp.textContent = Math.round(data.current.temp);
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.current.weather[0].description;
        weatherDesc.textContent = data.current.weather[0].description;
        
        // 3-day forecast
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';
        
        // Display 3 days of forecast
        for (let i = 0; i < 3; i++) {
            const day = data.daily[i];
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            
            forecastDay.innerHTML = `
                <div class="forecast-date">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="forecast-icon">
                <div class="forecast-temp">${Math.round(day.temp.day)}°C</div>
            `;
            
            forecastContainer.appendChild(forecastDay);
        }
    }

    // Try to fetch real weather data, use mock data if API key is not set or fetch fails
    if (apiKey !== 'YOUR_API_KEY') {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather API not available');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherDisplay(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                updateWeatherDisplay(mockWeatherData);
            });
    } else {
        // Use mock data when no API key is provided
        updateWeatherDisplay(mockWeatherData);
    }
});