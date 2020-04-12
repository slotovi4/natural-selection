import React from 'react';
import { Button, CardMedia } from '@material-ui/core';
import { FoodExpansionPanel, IProps as FoodExpansionPanelProps } from './FoodExpansionPanel';
import { SelectionExpansionPanel } from './SelectionExpansionPanel';
import { cn } from '@bem-react/classname';
import controlImg from './controlImg.jpg';
import './ControlSection.scss';

const ControlSection = ({
    onStartClick,
    onResetClick,
    food,
    disabled,
    setFoodCount
}: IProps) => {
    const cl = cn('ControlSection');

    return (
        <section className={cl()}>
            <CardMedia
                image={controlImg}
                title="Control Image"
                className={cl('Image')}
            />

            <SelectionExpansionPanel />
            <FoodExpansionPanel foodSettings={food} setFoodCount={setFoodCount} />

            <div className='p-2'>
                <Button disabled={disabled} variant="contained" onClick={onStartClick}>Start</Button>
                <Button disabled={disabled} variant="contained" onClick={onResetClick} className='ml-2'>Reset</Button>
            </div>
        </section>
    );
};

export default ControlSection;

interface IProps {
    disabled: boolean;
    food: FoodExpansionPanelProps["foodSettings"];
    onResetClick: () => void;
    onStartClick: () => void;
    setFoodCount: (foodCount: number) => void;
}