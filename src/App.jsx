import React, { useState } from 'react';
import './App.css';
import SearchIcon from './images/search.png';
import CloudsIcon from './images/clouds.png';
import ClearIcon from './images/clear.png';
import RainIcon from './images/rain.png';
import DrizzleIcon from './images/drizzle.png';
import MistIcon from './images/mist.png';
import HumidityIcon from './images/humidity.png';
import WindIcon from './images/wind.png';

const apiKey = "faef88de6bdcf81412ceb3f7b7ac37af";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
    weather: [{ main: 'Clear' }],
    name: ''
  });
  const [error, setError] = useState(false);

  const checkWeather = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (response.status === 404) {
        setError(true);
        setWeather({
          main: { temp: 0, humidity: 0 },
          wind: { speed: 0 },
          weather: [{ main: 'Clear' }],
          name: ''
        });
      } else {
        const data = await response.json();
        setError(false);
        setWeather(data);
      }
    } catch (error) {
      setError(true);
      setWeather({
        main: { temp: 0, humidity: 0 },
        wind: { speed: 0 },
        weather: [{ main: 'Clear' }],
        name: ''
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkWeather();
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clouds":
        return CloudsIcon;
      case "Clear":
        return ClearIcon;
      case "Rain":
        return RainIcon;
      case "Drizzle":
        return DrizzleIcon;
      case "Mist":
        return MistIcon;
      default:
        return RainIcon;
    }
  };

  return (
    <div className="card">
      <h1 className="heading">SkyCast: Weather Wizardry</h1>
      <div className="search">
        <input 
          type="text" 
          placeholder="Enter city name :" 
          spellCheck="false" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={checkWeather}>
          <img src={SearchIcon} alt="search" />
        </button>
      </div>
      {error && (
        <div className="error">
          <p>Invalid City Name. Please try again.</p>
        </div>
      )}
      {!error && weather.name && (
        <div className="weather">
          <img src={getWeatherIcon(weather.weather[0].main)} className="weather-icon" alt="weather" />
          <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
          <h2 className="city">{weather.name}</h2>
          <div className="details">
            <div className="col">
              <img src={HumidityIcon} alt="humidity" />
              <div>
                <p className="humidity">{weather.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={WindIcon} alt="wind" />
              <div>
                <p className="wind">{weather.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
