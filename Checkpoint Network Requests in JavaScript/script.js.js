
const

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const country = document.getElementById('country');
const dateElement = document.getElementById('date');
const temp = document.getElementById('temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');


async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


function updateWeatherUI(data) {
  cityName.textContent = data.name;
  country.textContent = data.sys.country;
  temp.textContent = Math.round(data.main.temp);
  weatherDesc.textContent = data.weather[0].description;
  wind.textContent = Math.round(data.wind.speed * 3.6); 
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
  
 
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
  
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}


async function handleSearch() {
  const city = cityInput.value.trim();
  
  if (city) {
    const weatherData = await fetchWeatherData(city);
    
    if (weatherData) {
      updateWeatherUI(weatherData);
    } else {
      alert('City not found. Please try another location.');
    }
  } else {
    alert('Please enter a city name');
  }
}


searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

window.addEventListener('load', () => {
  fetchWeatherData('London')
    .then(data => {
      if (data) {
        updateWeatherUI(data);
      }
    });
});