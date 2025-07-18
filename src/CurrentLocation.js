import React from "react";
import Forecast from "./Forecast";
import "./App.css";

function CurrentLocation() {
  return (
    <div className="weather-container">
      <Forecast icon="CLEAR_DAY" weather="Current Weather" />
    </div>
  );
}

export default CurrentLocation;
