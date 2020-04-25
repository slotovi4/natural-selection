import React from 'react';
import { Slider, FormControlLabel, Switch, Mark } from '@material-ui/core';
import { ExpansionPanel } from '../../index';
import { cn } from '@bem-react/classname';
import './CreatureExpansionPanel.scss';

const CreatureExpansionPanel = ({
    creatureSettings,
    setCreatureCount,
    disabled,
    setCreatureCanMutate,
    setCreatureMutationChance
}: IProps) => {
    const cl = cn('CreatureExpansionPanel');

    React.useEffect(() => {
        if (creatureSettings.creatureCount !== countCreature) {
            setCountCreature(creatureSettings.creatureCount);
        }
        if (creatureSettings.canMutate !== canMutate) {
            setCanMutate(creatureSettings.canMutate);
        }
        if (creatureSettings.mutationChance !== mutationChance) {
            setMutationChance(creatureSettings.mutationChance);
        }
    }, [creatureSettings]);

    const [countCreature, setCountCreature] = React.useState(creatureSettings.creatureCount);
    const [canMutate, setCanMutate] = React.useState(creatureSettings.canMutate);
    const [mutationChance, setMutationChance] = React.useState(creatureSettings.mutationChance);

    const creatureSliderStep = 1;
    const minCreatureCount = 1;
    const maxCreatureCount = 10;

    const mutationChanceSliderStep = 0.1;
    const minMutationChance = 0.1;
    const maxMutationChance = 1;

    const mutationChanceMarks: Mark[] = [
        { value: 0.1, label: '10%' },
        { value: 0.2, label: '20%' },
        { value: 0.3, label: '30%' },
        { value: 0.4, label: '40%' },
        { value: 0.5, label: '50%' },
        { value: 0.6, label: '60%' },
        { value: 0.7, label: '70%' },
        { value: 0.8, label: '80%' },
        { value: 0.9, label: '90%' },
        { value: 1, label: '100%' },
    ];

    const foodMarks: Mark[] = [];

    for (let i = minCreatureCount; i <= maxCreatureCount; i++) {
        foodMarks.push({ value: i, label: i });
    }

    const onChangeCanMutate = () => {
        setCanMutate(!canMutate);
        setCreatureCanMutate(!canMutate);
    };

    return (
        <ExpansionPanel
            id='creature'
            title='Creature settings'
            secondaryText='Настройки существ обитающих в среде'
        >
            <div className={cl('Panel-Container')}>
                <div className='w-100'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={canMutate}
                                onChange={onChangeCanMutate}
                                name="mutationSwitch"
                                color="primary"
                                disabled={disabled}
                            />
                        }
                        label={(
                            <div>
                                <span className={cl('Label')}>Mutation</span>
                                <span className={cl('Label', { secondary: true })}>Возможна ли мутация существа</span>
                            </div>
                        )}
                    />
                </div>

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

                <div className='w-100'>
                    <span className={cl('Label')}>Mutation chance</span>
                    <Slider
                        value={mutationChance}
                        onChange={(e, value) => typeof value === 'number' && setMutationChance(value)}
                        onChangeCommitted={(e, value) => typeof value === 'number' && setCreatureMutationChance(value)}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        className={cl('Slider')}
                        step={mutationChanceSliderStep}
                        marks={mutationChanceMarks}
                        min={minMutationChance}
                        max={maxMutationChance}
                        disabled={disabled || !canMutate}
                    />
                </div>
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
    setCreatureCanMutate: (canMutate: boolean) => void;
    setCreatureMutationChance: (mutationChance: number) => void;
}

interface ICreatureSettings {
    creatureCount: number;
    canMutate: boolean;
    mutationChance: number;
}