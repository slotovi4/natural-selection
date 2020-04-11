import React from 'react';
import { CanvasContainer, ControlSectionContainer } from '../containers';
import { Container } from '@material-ui/core';
import { cn } from '@bem-react/classname';
import './HomePage.scss';

const HomePage = () => {
    const cl = cn('HomePage');

    return (
        <Container className={cl()}>
            <ControlSectionContainer />
            <CanvasContainer />
        </Container>
    );
};

export default HomePage;
