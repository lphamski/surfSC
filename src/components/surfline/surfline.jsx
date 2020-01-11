import React, { useState, useEffect } from "react";
import { Card, RadioGroup, Radio, Button } from "@blueprintjs/core";
import SurflineWaveGraph from "./surflineWaveGraph";
import "../../css/surfline.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
const locations = ["Pleasure Point", "Steamer Lane Overview", "Cowell's Overview", "Jack's"];
const locationCodes = [
  "5842041f4e65fad6a7708807", 
  "584204214e65fad6a7709ce1",
  "584204214e65fad6a7709d20",
  "5842041f4e65fad6a770880b"
]

function Surfline() {
  const [dataType, setDataType] = useState("wave");
  const [surflineUnits, setSurflineUnits] = useState({});
  const [location, setLocation] = useState(locations[0]);
  const [locCode, setLocCode] = useState(0);
  // array of wave data 144 objects; 6 days 1 entry per hour
  const [myData, setMyData] = useState();

  useEffect(() => {
    const forecastData = async () => {
      var url =
        "https://services.surfline.com/kbyg/spots/forecasts/" +
        dataType +
        "?spotId=" + locationCodes[locCode];
      const response = await fetch(url);
      const data = await response.json();
      //setSurflineUnits(data.associated.units);
      setMyData(data.data); 
    };
    forecastData();
    
  }, [dataType, locCode]);
  
  function changePrevLocation() {
    var ind = locations.indexOf(location);
    if (ind === 0) {
      var len = locations.length;
      setLocation(locations[len - 1]);
      setLocCode(len - 1);
    } else {
      setLocation(locations[ind - 1]);
      setLocCode(ind - 1);
    }
  }

  function changeNextLocation() {
    var ind = locations.indexOf(location);
    if (ind === locations.length - 1) {
      setLocation(locations[0]);
      setLocCode(0);
    } else {
      setLocation(locations[ind + 1]);
      setLocCode(ind + 1);
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
        <h1 className="Surfline-location">
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
      {myData &&
      <SurflineWaveGraph
        data={myData}
        dataType={dataType}
        location={location}
      />}
    </Card>
  );
}

export default Surfline;
