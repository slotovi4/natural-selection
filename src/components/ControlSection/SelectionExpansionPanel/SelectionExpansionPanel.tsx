import React from 'react';
import { Slider, FormControlLabel, Radio, Mark } from '@material-ui/core';
import { ExpansionPanel } from '../../index';
import { checkResetExpansionSettings } from '../helpers';
import { cn } from '@bem-react/classname';
import './SelectionExpansionPanel.scss';

const SelectionExpansionPanel = ({
    disabled,
    setSelectionDaysCount,
    selectionSettings,
    setSelectionSpeed,
}: IProps) => {
    const cl = cn('SelectionExpansionPanel');

    React.useEffect(() => {
        if (checkResetExpansionSettings(selectionSettings, settings)) {
            setSettings(selectionSettings);
        }
    }, [selectionSettings]);

    const daysSliderStep = 10;
    const minDaysCount = 10;
    const maxDaysCount = 100;

    const [settings, setSettings] = React.useState(selectionSettings);

    const daysMarks: Mark[] = [
        { value: 10, label: 10 },
        { value: 30, label: 30 },
        { value: 50, label: 50 },
        { value: 100, label: 100 },
    ];

    const speedArr = Object.keys(SelectionSpeed);
    const renderRadios = () => speedArr.filter((e, i) => i >= speedArr.length / 2).map(key => (
        <FormControlLabel
            key={`radio_${key}`}
            control={<Radio color="primary" size='small' />}
            checked={settings.selectionSpeed === SelectionSpeed[key]}
            onChange={() => onChangeSpeed(SelectionSpeed[key])}
            value={SelectionSpeed[key]}
            name="selection-speed"
            label={key}
            disabled={disabled}
        />
    ));

    const onChangeSpeed = (selectionSpeed: SelectionSpeed) => {
        setSettings({ ...settings, selectionSpeed });
        setSelectionSpeed(selectionSpeed);
    };

    return (
        <ExpansionPanel
            id='selection'
            title='Selection settings'
            secondaryText='Глобальные настройки естественного отбора'
        >
            <div className={cl('Panel-Container')}>
                <div className='w-100'>
                    <span className={cl('Label')}>Selection days count</span>
                    <Slider
                        value={settings.selectionDays}
                        onChange={(e, value) => typeof value === 'number' && setSettings({ ...settings, selectionDays: value })}
                        onChangeCommitted={(e, value) => typeof value === 'number' && setSelectionDaysCount(value)}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        className={cl('Slider')}
                        step={daysSliderStep}
                        marks={daysMarks}
                        min={minDaysCount}
                        max={maxDaysCount}
                        disabled={disabled}
                    />
                </div>

                <div className='w-100'>
                    <span className={`${cl('Label')} pr-3`}>Selection speed</span>
                    {renderRadios()}
                </div>
            </div>
        </ExpansionPanel>
    );
};

export default SelectionExpansionPanel;

export interface ISelectionProps {
    selectionSettings: ISelectionSettings;
    setSelectionDaysCount: (daysCount: number) => void;
    setSelectionSpeed: (selectionSpeed: SelectionSpeed) => void;
}

export enum SelectionSpeed {
    X1 = 1,
    X2 = 2,
    X10 = 10,
}

interface IProps extends ISelectionProps {
    disabled: boolean;
}

interface ISelectionSettings {
    selectionDays: number;
    selectionSpeed: SelectionSpeed;
}