import React, { useState, useEffect } from "react";
import Forecast from "./components/Forecast";
import Map from "./components/Map";
import "./App.css";

interface ILocation {
  latitude: number;
  longitude: number;
}

interface IWeatherData {
  list: [];
}

function App() {
  // User coords
  const [location, setLocation] = useState<ILocation>();

  // API result
  const [weatherData, setWeatherData] = useState<IWeatherData>();

  function getLocation() {
    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => alert("This site requires location data")
      );
    }
  }

  function getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      });
  }

  // Runs when component is rendered
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    location?.latitude !== undefined &&
      location?.longitude !== undefined &&
      getWeather();
  }, [location]);

  const updateLocation = (lat: number, lon: number) => {
    setLocation({ latitude: lat, longitude: lon });
  };

  return (
    <div className="container">
      {location ? (
        <>
          <p>Lat: {location.latitude}</p>
          <p>Lon: {location.longitude}</p>
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            updateLocation={updateLocation}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}

      {weatherData ? (
        <Forecast weatherData={weatherData.list} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
