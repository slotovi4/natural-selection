import React from 'react';
import { Slider } from '@material-ui/core';
import { ExpansionPanel } from '../../index';
import { cn } from '@bem-react/classname';
import './FoodExpansionPanel.scss';

const FoodExpansionPanel = ({ foodSettings, setFoodCount, disabled }: IProps) => {
    const cl = cn('FoodExpansionPanel');

    const foodSliderStep = 1;
    const { minFoodCount } = foodSettings;
    const maxFoodCount = foodSettings.maxFoodCount / foodSliderStep;

    const [countFood, setCountFood] = React.useState(minFoodCount);

    const foodMarks = [
        {
            value: minFoodCount,
            label: '0%',
        },
        {
            value: 20,
            label: '20%',
        },
        {
            value: 30,
            label: '30%',
        },
        {
            value: maxFoodCount,
            label: '100%',
        },
    ];

    return (
        <ExpansionPanel
            id='food'
            title='Food settings'
            secondaryText='Настройки пищи'
        >
            <div className='w-100'>
                <span className={cl('Label')}>Food count</span>
                <Slider
                    value={countFood}
                    onChange={(e, value) => typeof value === 'number' && setCountFood(value)}
                    onChangeCommitted={(e, value) => typeof value === 'number' && setFoodCount(value * foodSliderStep)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    className={cl('Slider')}
                    step={foodSliderStep}
                    marks={foodMarks}
                    min={minFoodCount}
                    max={maxFoodCount}
                    disabled={disabled}
                />
            </div>
        </ExpansionPanel>
    );
};

export default FoodExpansionPanel;

interface IProps extends IFoodProps {
    disabled: boolean;
}

export interface IFoodProps {
    foodSettings: IFood;
    setFoodCount: (foodCount: number) => void;
}

interface IFood {
    maxFoodCount: number;
    minFoodCount: number;
    foodCount: number;
}
