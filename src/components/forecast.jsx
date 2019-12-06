import React from 'react';
import { Card, Button, AnchorButton } from '@blueprintjs/core';
import MagicSeaWeed from './magicSeaWeed';
import Surfline from './surfline';


import '../css/forecast.scss';

function Forecast() {

    // might add animations to this below
    const handleClick = () => {};

    return (
        <React.Fragment>
            <Card className="Forecast-card" onClick={handleClick} interactive={true}>
                <Surfline/>
                <Button icon="refresh">Submit</Button>
                <AnchorButton text="Click" />
            </Card>
        </React.Fragment>
    );
}

export default Forecast;