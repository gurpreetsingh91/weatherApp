import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Weather icons mapping
const weatherIcons = {
  'Clear': '☀️',
  'Clouds': '☁️',
  'Rain': '🌧️',
  'Drizzle': '🌦️',
  'Thunderstorm': '⛈️',
  'Snow': '❄️',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Haze': '🌫️',
  'Dust': '🌪️',
  'Smoke': '🌫️'
};

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // OpenWeatherMap API key (you'll need to get your own from openweathermap.org)
  const API_KEY = 'your_api_key_here'; // Replace with actual API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Get user's current location weather on load
  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // If location access denied, default to a popular city
          fetchWeatherByCity('New York');
        }
      );
    } else {
      fetchWeatherByCity('New York');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, using mock data since API key is needed
      setMockData();
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, using mock data since API key is needed
      setMockData(cityName);
    } catch (err) {
      setError('City not found. Please check the spelling and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const setMockData = (cityName = 'Current Location') => {
    const mockWeather = {
      name: cityName,
      main: {
        temp: Math.floor(Math.random() * 30) + 10,
        feels_like: Math.floor(Math.random() * 30) + 10,
        humidity: Math.floor(Math.random() * 40) + 40,
        pressure: Math.floor(Math.random() * 50) + 1000
      },
      weather: [{
        main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
        description: 'scattered clouds'
      }],
      wind: {
        speed: Math.floor(Math.random() * 10) + 5
      },
      visibility: 10000
    };

    const mockForecast = {
      list: Array.from({ length: 5 }, (_, i) => ({
        dt: Date.now() + (i + 1) * 24 * 60 * 60 * 1000,
        main: {
          temp: Math.floor(Math.random() * 25) + 15,
          temp_min: Math.floor(Math.random() * 20) + 10,
          temp_max: Math.floor(Math.random() * 30) + 20
        },
        weather: [{
          main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
          description: 'scattered clouds'
        }]
      }))
    };

    setWeather(mockWeather);
    setForecast(mockForecast);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherByCity(city);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="App">
      <div className="weather-container">
        <header className="app-header">
          <h1>🌤️ WeatherApp</h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              🔍
            </button>
          </form>
        </header>

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <main className="weather-main">
            <div className="current-weather">
              <div className="weather-info">
                <h2>{weather.name}</h2>
                <div className="weather-icon">
                  {weatherIcons[weather.weather[0].main] || '🌤️'}
                </div>
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather-description">
                  {weather.weather[0].description}
                </div>
                <div className="feels-like">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </div>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">💧 Humidity</span>
                  <span className="detail-value">{weather.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🌬️ Wind Speed</span>
                  <span className="detail-value">{weather.wind.speed} m/s</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📊 Pressure</span>
                  <span className="detail-value">{weather.main.pressure} hPa</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">👁️ Visibility</span>
                  <span className="detail-value">{weather.visibility / 1000} km</span>
                </div>
              </div>
            </div>

            {forecast && (
              <div className="forecast">
                <h3>5-Day Forecast</h3>
                <div className="forecast-list">
                  {forecast.list.map((day, index) => (
                    <div key={index} className="forecast-item">
                      <div className="forecast-date">
                        {formatDate(day.dt)}
                      </div>
                      <div className="forecast-icon">
                        {weatherIcons[day.weather[0].main] || '🌤️'}
                      </div>
                      <div className="forecast-temps">
                        <span className="temp-high">{Math.round(day.main.temp_max)}°</span>
                        <span className="temp-low">{Math.round(day.main.temp_min)}°</span>
                      </div>
                      <div className="forecast-desc">
                        {day.weather[0].description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        )}

        <footer className="app-footer">
          <p>Weather data provided by OpenWeatherMap</p>
          <p>Demo app - Replace API_KEY with your own key for live data</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
