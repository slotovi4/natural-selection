import React from 'react';
import { Slider } from '@material-ui/core';
import { ExpansionPanel } from '../../index';
import { cn } from '@bem-react/classname';
import './SelectionExpansionPanel.scss';

const SelectionExpansionPanel = ({ disabled, setSelectionDaysCount, selectionSettings }: IProps) => {
    const cl = cn('SelectionExpansionPanel');

    React.useEffect(() => {
        if (selectionSettings.selectionDays !== daysCount) {
            setDaysCount(selectionSettings.selectionDays);
        }
    }, [selectionSettings]);

    const daysSliderStep = 10;
    const minDaysCount = 10;
    const maxDaysCount = 100;

    const [daysCount, setDaysCount] = React.useState(selectionSettings.selectionDays);

    const foodMarks = [
        { value: 10, label: 10},
        { value: 30, label: 30},
        { value: 50, label: 50},
        { value: 100, label: 100},
    ];

    return (
        <ExpansionPanel
            id='selection'
            title='Selection settings'
            secondaryText='Глобальные настройки естественного отбора'
        >
            <div className='w-100'>
                <span className={cl('Label')}>Selection days count</span>
                <Slider
                    value={daysCount}
                    onChange={(e, value) => typeof value === 'number' && setDaysCount(value)}
                    onChangeCommitted={(e, value) => typeof value === 'number' && setSelectionDaysCount(value)}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    className={cl('Slider')}
                    step={daysSliderStep}
                    marks={foodMarks}
                    min={minDaysCount}
                    max={maxDaysCount}
                    disabled={disabled}
                />
            </div>
        </ExpansionPanel>
    );
};

export default SelectionExpansionPanel;

interface IProps extends ISelectionProps {
    disabled: boolean;
}

export interface ISelectionProps {
    selectionSettings: ISelectionSettings;
    setSelectionDaysCount: (daysCount: number) => void;
}

interface ISelectionSettings {
    selectionDays: number;
}