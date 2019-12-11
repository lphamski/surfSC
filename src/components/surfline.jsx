import React, { useState, useEffect } from "react";
import { Card, Button, AnchorButton } from "@blueprintjs/core";
import "../css/surfline.scss";

function Surfline() {
  // url query variable
  const [dataType, setDataType] = useState("wave");
  // units variable
  const [surflineUnits, setSurflineUnits] = useState({});
  // array of wave data 144 objects; 6 days 1 entry per hour
  const [waveData, setWaveData] = useState([]);
  // long lat for location
  const [longLat, setLongLat] = useState({});

  useEffect(() => {
    const forecastData = async () => {
      var url =
        "https://services.surfline.com/kbyg/spots/forecasts/" +
        dataType +
        "?spotId=5842041f4e65fad6a7708807";
      const response = await fetch(url);
      const data = await response.json();
      setSurflineUnits(data.associated.units);
      setWaveData(data.data.wave);
      setLongLat(data.associated.location);
      console.log(data);
    };
    forecastData();
  }, [dataType]);

  console.log(waveData);
  console.log(surflineUnits);

  const getOkay = arr => {
    
      arr.map(wave => (
        <div className="station" key={wave}>
          {wave}
        </div>
      ));
  };

  return (
    <Card className="Surfline-card">
      <h1>
        <strong>Pleasure Point</strong>
      </h1>
      <p>
        <strong>Longitude:</strong> {longLat.lon} <strong>Latitude:</strong>{" "}
        {longLat.lat}
      </p>
      <span>{getOkay}</span>
    </Card>
  );
}

export default Surfline;
