import React, { useState, useEffect } from 'react'
import { Card, Button, AnchorButton } from '@blueprintjs/core'
import axios from 'axios'
import '../css/forecast.scss'

function Forecast() {
    //going to store API calls into data below using react hooks
    const [data, setData] = useState({})
    
    useEffect(() => {
        const forecastData = async () => {
            const result = await axios(
                'https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=5842041f4e65fad6a7708807',
            )
            console.log(result)
            setData(result.data)
        }
        forecastData()
        
    }, [])


    // might add animations to this below
    const handleClick = () => {}

    return (
        <React.Fragment>
            <Card className="Forecast-card" onClick={handleClick} interactive={true}>
                <h5>Santa Cruz Surf</h5>
                <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.t</p>
                <Button icon="refresh">Submit</Button>
                <AnchorButton text="Click" />
            </Card>
        </React.Fragment>
    )
}

export default Forecast