import React from 'react';
import { getParamAverageValue, fixValue } from '../../helpers';
import { ExpansionPanel } from '../../ExpansionPanel';
import { TableDetails } from './TableDetails';
import { ISelectionResultData } from '../SelectionDetails';
import { cn } from '@bem-react/classname';
import './DialogSelection.scss';

const DialogSelection = ({ selection, num }: IProps) => {
    const cl = cn('DialogSelection');
    const averageSelectionVelocityArr: number[] = [];
    const averageSelectionVisibilityArr: number[] = [];
    const averageSelectionEnergyArr: number[] = [];
    const averageSelectionSizeArr: number[] = [];
    const { length } = selection;

    for (let j = 0; j < length; j++) {
        const { survivedCreatures } = selection[j];
        averageSelectionVelocityArr.push(getParamAverageValue(survivedCreatures.map(e => e.velocity)));
        averageSelectionVisibilityArr.push(getParamAverageValue(survivedCreatures.map(e => e.visibilitySize)));
        averageSelectionEnergyArr.push(getParamAverageValue(survivedCreatures.map(e => e.energyIntensity)));
        averageSelectionSizeArr.push(getParamAverageValue(survivedCreatures.map(e => e.size)));
    }

    const averageSelectionVelocity = getParamAverageValue(averageSelectionVelocityArr);
    const averageSelectionVisibility = getParamAverageValue(averageSelectionVisibilityArr);
    const averageSelectionEnergy = getParamAverageValue(averageSelectionEnergyArr);
    const averageSelectionSize = getParamAverageValue(averageSelectionEnergyArr);

    return (
        <ExpansionPanel
            title={`отбор №${num + 1}`}
            secondaryText={`${length} дней`}
            id={`expansion_selection_${num}`}
            contentClassName='p-0'
            gray
        >
            <div className='w-100'>
                <div className={cl('Selection-Average-Container')}>
                    <span>средн. скорость: {fixValue(averageSelectionVelocity)}</span>
                    <span>средн. чувствительность: {fixValue(averageSelectionVisibility)}</span>
                    <span>средн. энергия: {fixValue(averageSelectionEnergy)}</span>
                    <span>средн. размер: {fixValue(averageSelectionSize)}</span>
                </div>
                <TableDetails selection={selection} />
            </div>
        </ExpansionPanel>
    );
};

export default DialogSelection;

interface IProps {
    selection: ISelectionResultData[];
    num: number;
}
