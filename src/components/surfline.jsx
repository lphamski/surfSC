import React, { useState, useEffect } from 'react';


function Surfline() {
    const [surflineData, setSurflineData] = useState({});
    const [dataType, setDataType] = useState('wave')


    const forecastData = async () => {
        var url = 'https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a7708807'
        const response = await fetch(url);
        const data = await response.json();
        setSurflineData(data);
    }

    useEffect( () => {
        forecastData();
    }, []);
    console.log(surflineData.associated.units)

    return (
            <p>Longitude: {typeof surflineData}</p>

    );
}

export default Surfline;