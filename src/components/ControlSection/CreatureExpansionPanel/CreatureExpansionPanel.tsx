import React from 'react';
import { Slider } from '@material-ui/core';
import { ExpansionPanel } from '../../index';
import { cn } from '@bem-react/classname';

const CreatureExpansionPanel = ({ creatureSettings, setCreatureCount, disabled }: IProps) => {
    const cl = cn('FoodExpansionPanel');

    React.useEffect(() => {
        if (creatureSettings.creatureCount !== countCreature) {
            setCountCreature(creatureSettings.creatureCount);
        }
    }, [creatureSettings]);

    const creatureSliderStep = 1;
    const minCreatureCount = 1;
    const maxCreatureCount = 10;

    const [countCreature, setCountCreature] = React.useState(creatureSettings.creatureCount);

    const foodMarks = [];

    for (let i = minCreatureCount; i <= maxCreatureCount; i++) {
        foodMarks.push({ value: i, label: i });
    }

    return (
        <ExpansionPanel
            id='creature'
            title='Creature settings'
            secondaryText='Настройки существ обитающих в среде'
        >
            <div className='w-100'>
                <span className={cl('Label')}>Creature count</span>
                <Slider
                    value={countCreature}
                    onChange={(e, value) => typeof value === 'number' && setCountCreature(value)}
                    onChangeCommitted={(e, value) => typeof value === 'number' && setCreatureCount(value * creatureSliderStep)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    className={cl('Slider')}
                    step={creatureSliderStep}
                    marks={foodMarks}
                    min={minCreatureCount}
                    max={maxCreatureCount}
                    disabled={disabled}
                />
            </div>
        </ExpansionPanel>
    );
};

export default CreatureExpansionPanel;

interface IProps extends ICreatureProps {
    disabled: boolean;
}

export interface ICreatureProps {
    creatureSettings: ICreatureSettings;
    setCreatureCount: (creatureCount: number) => void;
}

interface ICreatureSettings {
    creatureCount: number;
}