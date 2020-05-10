import React from 'react';
import { AppBar, Typography, Container } from '@material-ui/core';
import { cn } from '@bem-react/classname';
import PetsIcon from '@material-ui/icons/Pets';
import './Header.scss';

const Header = () => {
    const cl = cn('Header');

    return (
        <AppBar position="static">
            <Container className={cl()}>
                <PetsIcon className={cl('Icon')} />
                <Typography variant="h6">
                    Natural_Selection
                </Typography>
            </Container>
        </AppBar>
    );
};

export default Header;
