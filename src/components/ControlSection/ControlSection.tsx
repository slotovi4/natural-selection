import React from 'react';
import {
    Button,
    CardMedia,
    Slider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';
import { cn } from '@bem-react/classname';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import selectionImg from './selectionImg.jpg';
import './ControlSection.scss';

const ControlSection = ({
    onStartClick,
    onResetClick,
    food,
    disabled,
    setFoodCount
}: IProps) => {
    const cl = cn('ControlSection');
    const foodSliderStep = 1;
    const { minFoodCount } = food;
    const maxFoodCount = food.maxFoodCount / foodSliderStep;
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

    const renderSelectionHeader = (title: string, secondaryText?: string) => (
        <div className={cl('Expansion-Header')}>
            <span className={cl('Title')}>{title}</span>
            <span className={cl('Text', { secondary: true })}>{secondaryText}</span>
        </div>
    );

    return (
        <section className={cl()}>
            <CardMedia
                image={selectionImg}
                title="Selection Image"
                className={cl('Image')}
            />
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="controlSelection"
                    id="Selection"
                >
                    {renderSelectionHeader('Selection settings', 'Глобальные настройки естественного отбора')}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className='row'>
                        <span>some params</span>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="controlSelection"
                    id="Food"
                >
                    {renderSelectionHeader('Food settings', 'Настройки пищи')}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
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
                        />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

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
    food: IFood;
    onResetClick: () => void;
    onStartClick: () => void;
    setFoodCount: (foodCount: number) => void;
}

interface IFood {
    maxFoodCount: number;
    minFoodCount: number;
    foodCount: number;
}