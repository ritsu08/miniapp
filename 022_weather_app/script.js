const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityNameDisplay = document.getElementById('city-name');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');

// Replace with your OpenWeatherMap API Key
const API_KEY = 'fdee1e72309cb1cd68aebaff05b452b5'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

getWeatherBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        errorMessage.textContent = '都市名を入力してください。';
        clearWeatherDisplay();
        return;
    }

    errorMessage.textContent = ''; // Clear previous errors

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ja`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            errorMessage.textContent = data.message || '天気情報の取得に失敗しました。';
            clearWeatherDisplay();
        }
    } catch (error) {
        errorMessage.textContent = 'ネットワークエラーが発生しました。';
        clearWeatherDisplay();
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    cityNameDisplay.textContent = data.name;
    temperatureDisplay.textContent = `${data.main.temp}°C`;
    descriptionDisplay.textContent = data.weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    weatherIcon.style.display = 'block'; // アイコンを表示
}

function clearWeatherDisplay() {
    cityNameDisplay.textContent = '';
    temperatureDisplay.textContent = '';
    descriptionDisplay.textContent = '';
    weatherIcon.src = '';
    weatherIcon.alt = '';
    weatherIcon.style.display = 'none'; // アイコンを非表示
}
