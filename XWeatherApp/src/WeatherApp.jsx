import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '881e17822eb944f3ae3143748250506'; 

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: API_KEY,
          q: city
        }
      });
      setWeather(response.data);
    } catch (err) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#eaf6ff', minHeight: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: '10px',
          width: '200px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={fetchWeather}
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Search
      </button>

      {loading && <p style={{ marginTop: '20px' }}>Loading data…</p>}

      {weather && (
        <div className="weather-cards" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="weather-card" style={cardStyle}>
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px 30px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
  minWidth: '150px'
};

export default WeatherApp;
