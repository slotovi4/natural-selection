import React from 'react';
import { Button, Card } from '@material-ui/core';
import { cn } from '@bem-react/classname';
import './ControlSection.scss';

const ControlSection = () => {
    const [start, setStart] = React.useState(false);
    const cl = cn('ControlSection');

    return (
        <section className={cl()}>
            <Card className={cl('Card')}>
                <Button variant="contained" onClick={() => setStart(true)} >Start</Button>
            </Card>
        </section>
    );
};

export default ControlSection;
