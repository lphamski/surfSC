import React from 'react'
import { Card, Button, AnchorButton } from '@blueprintjs/core'

function Forecast() {
    return (
        <React.Fragment>
            <Card interactive={true}>
                <h5><a href="/">Card heading</a></h5>
                <p>Card content</p>
                <Button icon="refresh">Submit</Button>
                <AnchorButton text="Click" />
            </Card>
        </React.Fragment>
    )
}

export default Forecast