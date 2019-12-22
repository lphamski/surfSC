import React, { useState, useEffect } from "react";
import { Card, RadioGroup, Radio } from "@blueprintjs/core";
import SurflineWaveGraph from "./surflineWaveGraph";
import "../../css/surfline.scss";

function Surfline() {
  const [dataType, setDataType] = useState("wave");
  const [surflineUnits, setSurflineUnits] = useState({});

  // array of wave data 144 objects; 6 days 1 entry per hour
  const [waveData, setWaveData] = useState([]);
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

  //console.log(waveData);
  //console.log(surflineUnits);

  const apiCallType = (value) => {
    console.log(value);
    setDataType(value);
  }


  return (
    <Card className="Surfline-card">
      <h1>
        <strong>Pleasure Point</strong>
      </h1>
      <RadioGroup label="Type of Forecast" inline={true} onChange={e => setDataType(e.target.value)} selectedValue={dataType}>
        <Radio label="Wave" value="wave" large />
        <Radio label="Wind" value="wind"large checked/>
        <Radio label="Tides" value="tides" large/>
        <Radio label="Weather" value="weather" large/>
      </RadioGroup>
      {/* <p>
        <strong>Longitude:</strong> {longLat.lon} <strong>Latitude:</strong>{" "}
        {longLat.lat}
      </p> */}
      <p>{dataType}</p>
      <SurflineWaveGraph waveData={waveData} />
      
    </Card>
  );
}

export default Surfline;
