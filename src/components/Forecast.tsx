import React, { useState } from "react";

interface Props {
  weatherData: Timestamp[];
}

type Timestamp = {
  clouds: { all: 90 };
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: IWeather[];
  wind: { speed: number; deg: number; gust: number };
};

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

const Forecast: React.FC<Props> = ({ weatherData }) => {
  return (
    <div className="forecast">
      {console.log(weatherData)}
      {weatherData.map((timestamp, index) => {
        return (
          <div
            className={index === 0 ? "timestamp current-day" : "timestamp"}
            key={timestamp.dt}
          >
            <div className="temperature">
              <h2 className="temp">{timestamp.main.temp}C</h2>
              <p className="temp-range">
                {timestamp.main.temp_min} - {timestamp.main.temp_max}C;
              </p>
            </div>
            <p className="wind-speed">{timestamp.wind.speed} m/s</p>
            <p className="time-of-day">
              {timestamp.dt_txt.substring(
                timestamp.dt_txt.length - 8,
                timestamp.dt_txt.length - 3
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
