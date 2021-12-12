import React, { useState, useEffect } from "react";
import axios from "axios";
// import './App.css';

function App() {
  // User coords
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ longitude: 0, latitude: 0 });

  // API result
  const [weatherData, setWeatherData] = useState({});

  async function getWeather() {
    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    // API call
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((data) => setWeatherData(data));
  }

  // Runs when component is rendered
  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <br />
      <p>Weather: {}</p>
    </>
  );
}

export default App;
