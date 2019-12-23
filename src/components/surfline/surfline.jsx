import React, { useState, useEffect } from "react";
import { Card, RadioGroup, Radio, Button } from "@blueprintjs/core";
import SurflineWaveGraph from "./surflineWaveGraph";
import "../../css/surfline.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
const locations = ["Pleasure Point", "Seabright", "Capitola", "Soquel"];

function Surfline() {
  const [dataType, setDataType] = useState("wave");
  const [surflineUnits, setSurflineUnits] = useState({});
  const [location, setLocation] = useState(locations[2]);
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

  function changePrevLocation() {
    var ind = locations.indexOf(location);
    if (ind === 0) {
      var len = locations.length;
      setLocation(locations[len - 1]);
    } else {
      setLocation(locations[ind - 1]);
    }
  }

  function changeNextLocation() {
    var ind = locations.indexOf(location);
    if (ind === locations.length - 1) {
      setLocation(locations[0]);
    } else {
      setLocation(locations[ind + 1]);
    }
  }

  //console.log(waveData);
  //console.log(surflineUnits);

  return (
    <Card className="Surfline-card">
      <div className="Surfline-header">
        <Button className="Surfline-arrow-btn" onClick={changePrevLocation}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <h1>
          <strong>{location}</strong>
        </h1>
        <Button className="Surfline-arrow-btn" onClick={changeNextLocation}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
      <RadioGroup
        label="Type of Forecast"
        inline={true}
        onChange={e => setDataType(e.target.value)}
        selectedValue={dataType}
      >
        <Radio label="Wave" value="wave" large />
        <Radio label="Wind" value="wind" large checked />
        <Radio label="Tides" value="tides" large />
        <Radio label="Weather" value="weather" large />
      </RadioGroup>
      <p>{dataType}</p>
      <SurflineWaveGraph
        waveData={waveData}
        dataType={dataType}
        location={location}
      />
    </Card>
  );
}

export default Surfline;
