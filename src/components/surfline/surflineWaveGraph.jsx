import React, { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

const SurflineWaveGraph = props => {
  //console.log(props);

  const [coordinates, setCoordinates] = useState([]);
  
  useEffect(() => {
    if (props.dataType === "wave"){
      // Reset state to empty object to make sure 
      setCoordinates([])
      props.data.wave.forEach(obj => {
        setCoordinates(old => [...old, {x: obj.timestamp, y: obj.surf.max}])
      });
    } else if (props.dataType === "wind") {
      setCoordinates([])
      props.data.wind.forEach(obj => {
        setCoordinates(old => [...old, {x: obj.timestamp, y: obj.speed}])
      });
    } else if (props.dataType === "tides") {
      setCoordinates([])
      props.data.tides.forEach(obj => {
        setCoordinates(old => [...old, {x: obj.timestamp, y: obj.height}])
      });
    } else {
      console.log(props)
      setCoordinates([])
      props.data.weather.forEach(obj => {
        setCoordinates(old => [...old, {x: obj.timestamp, y: obj.temperature}])
      });
    }
  },[props.data]);

  return (
    <div>
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={15}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px dashed #ccc" }
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          data={coordinates}
        />
      </VictoryChart>
    </div>
  );
};
export default SurflineWaveGraph;
