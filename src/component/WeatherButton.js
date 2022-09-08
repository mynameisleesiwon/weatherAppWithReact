import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, selectedCity }) => {
  return (
    <div>
      <Button
        variant={`${selectedCity === "" ? "success" : "warning"}`}
        onClick={() => {
          setCity("");
        }}
      >
        Current Location
      </Button>
      {cities.map((city, index) => {
        return (
          <Button
            variant={`${selectedCity === city ? "success" : "warning"}`}
            onClick={() => {
              setCity(city);
            }}
          >
            {city}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
