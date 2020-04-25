import React from 'react';
import { Card } from '@material-ui/core';
import { cn } from '@bem-react/classname';
import './SelectionDetails.scss';

const SelectionDetails = () => {
    const cl = cn('SelectionDetails');
    
    return (
        <Card className={cl()}>
            <span>params</span>
        </Card>
    );
};

export default SelectionDetails;
