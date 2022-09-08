import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-box">
      <div>{weather && weather.name}</div>
      {/* 또는 삼항연산자 이용 */}
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}도</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
