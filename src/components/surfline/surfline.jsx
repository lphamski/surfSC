import React, { useState, useEffect } from "react";
import { Card, RadioGroup, Radio, Button } from "@blueprintjs/core";
import SurflineWaveGraph from "./surflineWaveGraph";
import "../../css/surfline.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';




function Surfline() {
  const [dataType, setDataType] = useState("wave");
  const [surflineUnits, setSurflineUnits] = useState({});
  // array of wave data 144 objects; 6 days 1 entry per hour
  const [waveData, setWaveData] = useState([]);

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
      console.log(data);
    };
    forecastData();
  }, [dataType]);

  //console.log(waveData);
  //console.log(surflineUnits);

  return (
    <Card className="Surfline-card">
      <div className="Surfline-header">
        <Button className="Surfline-arrow-btn">
          <FontAwesomeIcon icon={faChevronLeft}/>
        </Button>
        <h1>
          <strong>Pleasure Point</strong>
        </h1>
        <Button className="Surfline-arrow-btn">
        <FontAwesomeIcon icon={faChevronRight}/>
        </Button>
      </div>
      <RadioGroup label="Type of Forecast" inline={true} onChange={e => setDataType(e.target.value)} selectedValue={dataType}>
        <Radio label="Wave" value="wave" large />
        <Radio label="Wind" value="wind"large checked/>
        <Radio label="Tides" value="tides" large/>
        <Radio label="Weather" value="weather" large/>
      </RadioGroup>
      <p>{dataType}</p>
      <SurflineWaveGraph waveData={waveData}  dataType={dataType}/>
    </Card>
  );
}

export default Surfline;
