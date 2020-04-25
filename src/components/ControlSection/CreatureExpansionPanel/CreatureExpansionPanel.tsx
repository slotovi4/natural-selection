import React from 'react';
import { Slider, FormControlLabel, Switch, Mark } from '@material-ui/core';
import { ExpansionPanel } from '../../index';
import { checkResetExpansionSettings } from '../helpers';
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
        if (checkResetExpansionSettings(creatureSettings, settings)) {
            setSettings(creatureSettings);
        }
    }, [creatureSettings]);

    const [settings, setSettings] = React.useState(creatureSettings);

    const creatureSliderStep = 1;
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

    const creatureCountMarks: Mark[] = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
    ];

    const onChangeCanMutate = () => {
        setSettings({ ...settings, canMutate: !settings.canMutate });
        setCreatureCanMutate(!settings.canMutate);
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
                                checked={settings.canMutate}
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
                        value={settings.creatureCount}
                        onChange={(e, value) => typeof value === 'number' && setSettings({ ...settings, creatureCount: value })}
                        onChangeCommitted={(e, value) => typeof value === 'number' && setCreatureCount(value * creatureSliderStep)}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        className={cl('Slider')}
                        step={creatureSliderStep}
                        marks={creatureCountMarks}
                        min={1}
                        max={10}
                        disabled={disabled}
                    />
                </div>

                <div className='w-100'>
                    <span className={cl('Label')}>Mutation chance</span>
                    <Slider
                        value={settings.mutationChance}
                        onChange={(e, value) => typeof value === 'number' && setSettings({ ...settings, mutationChance: value })}
                        onChangeCommitted={(e, value) => typeof value === 'number' && setCreatureMutationChance(value)}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        className={cl('Slider')}
                        step={mutationChanceSliderStep}
                        marks={mutationChanceMarks}
                        min={minMutationChance}
                        max={maxMutationChance}
                        disabled={disabled || !settings.canMutate}
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