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
    const { length } = selection;

    for (let j = 0; j < length; j++) {
        averageSelectionVelocityArr.push(getParamAverageValue(selection[j].survivedCreatures.map(e => e.velocity)));
        averageSelectionVisibilityArr.push(getParamAverageValue(selection[j].survivedCreatures.map(e => e.visibilityRadius)));
        averageSelectionEnergyArr.push(getParamAverageValue(selection[j].survivedCreatures.map(e => e.energyIntensity)));
    }

    const averageSelectionVelocity = getParamAverageValue(averageSelectionVelocityArr);
    const averageSelectionVisibility = getParamAverageValue(averageSelectionVisibilityArr);
    const averageSelectionEnergy = getParamAverageValue(averageSelectionEnergyArr);

    return (
        <ExpansionPanel
            title={`отбор №${num + 1}`}
            secondaryText={`${length} дней`}
            id={`expansion_selection_${num}`}
            contentClassName='p-0'
            gray
        >
            <div>
                <div className={cl('Selection-Average-Container')}>
                    <span>средняя скорость: {fixValue(averageSelectionVelocity)}</span>
                    <span>средняя чувствительность: {fixValue(averageSelectionVisibility)}</span>
                    <span>средняя энергия: {fixValue(averageSelectionEnergy)}</span>
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
