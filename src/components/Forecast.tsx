import React from "react";

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
  weather: Weather[];
  wind: { speed: number; deg: number; gust: number };
};

type Weather = { id: number; main: string; description: string; icon: string };

const Forecast: React.FC<Props> = ({ weatherData }) => {
  return (
    <ul className="forecast">
      {console.log(weatherData)}
      {weatherData.map((timestamp, index) => {
        return (
          <li className="timestamp">
            <div className="temperature">
              <h2>{timestamp.main.temp}C</h2>
              <p>
                {timestamp.main.temp_min} - {timestamp.main.temp_max}C;
              </p>
            </div>
            <h3>{timestamp.wind.speed} m/s</h3>
            <p>
              {timestamp.dt_txt.substring(
                timestamp.dt_txt.length - 8,
                timestamp.dt_txt.length - 3
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Forecast;
