import React, { useState, useEffect } from "react";
import axios from "axios";
// import './App.css';

const testList = {
  base: "stations",
  clouds: { all: 90 },
  cod: 200,
  coord: { lon: 26.6477, lat: 58.4526 },
  dt: 1639325731,
  id: 588334,
  main: {
    temp: 273.36,
    feels_like: 273.36,
    temp_min: 273.36,
    temp_max: 274.33,
    pressure: 1020,
    humidity: 86,
  },
  name: "Tartu",
  sys: {
    type: 2,
    id: 2038091,
    country: "EE",
    sunrise: 1639292023,
    sunset: 1639315247,
  },
  timezone: 7200,
  visibility: 10000,
  weather: [
    { id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" },
  ],
  wind: { speed: 1.03, deg: 220 },
};

interface location {
  latitude: number;
  longitude: number;
}

interface weather {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

function App() {
  // User coords
  const [location, setLocation] = useState<location>({
    longitude: 0,
    latitude: 0,
  });

  // API result
  const [weatherData, setWeatherData] = useState<weather>();

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
      .then((response) => {
        setWeatherData(response.data);
      });
  }

  // Runs when component is rendered
  useEffect(() => {
    getWeather();
    // setWeatherData(testList);
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      <br />
      {weatherData ? (
        <>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} smth deg</p>
          <p>{weatherData.weather.description}</p>
        </>
      ) : null}
    </>
  );
}

export default App;
