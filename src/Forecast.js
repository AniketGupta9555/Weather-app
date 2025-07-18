import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ icon, weather: weatherTitle }) {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  const fetchWeather = (cityName) => {
    const city = cityName || query || "Delhi";
    axios
      .get(`${apiKeys.base}weather?q=${city}&units=metric&APPID=${apiKeys.key}`)
      .then((res) => {
        setWeather(res.data);
        setQuery("");
        setError(null);
      })
      .catch(() => {
        setWeather(null);
        setError(`City "${city}" not found`);
      });
  };

  useEffect(() => {
    fetchWeather("Delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{weatherTitle}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <div className="img-box" onClick={() => fetchWeather()}>
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="search"
            />
          </div>
        </div>

        {weather ? (
          <ul>
            <li className="cityHead">
              <p>
                {weather.name}, {weather.sys.country}
              </p>
              <img
                className="temp"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
            </li>
            <li>
              Temperature:{" "}
              <span className="temp">
                {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
              </span>
            </li>
            <li>
              Humidity:{" "}
              <span className="temp">{Math.round(weather.main.humidity)}%</span>
            </li>
            <li>
              Visibility:{" "}
              <span className="temp">{weather.visibility / 1000} km</span>
            </li>
            <li>
              Wind Speed:{" "}
              <span className="temp">{weather.wind.speed} m/s</span>
            </li>
          </ul>
        ) : (
          <p style={{ color: "red" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default Forecast;
