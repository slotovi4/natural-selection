import React from 'react';
import { getParamChangeDifference, getParamAverageValue, fixValue } from '../../helpers';
import { ColorizeParamDifference } from '../../ColorizeParamDifference';
import { ISelectionResultData } from '../SelectionDetails';
import { cn } from '@bem-react/classname';
import './DetailsRows.scss';

const DetailsRows = ({ lastSelectionDaysArr }: IProps) => {
    const cl = cn('DetailsRows');
    const { length } = lastSelectionDaysArr;
    const survivedCreaturesCount: number[] = [];
    const dieCreaturesCount: number[] = [];
    const offspringCreaturesCount: number[] = [];
    const averageVelocityArr: number[] = [];
    const averageVisibilityArr: number[] = [];
    const averageEnergyArr: number[] = [];
    const averageSizeArr: number[] = [];

    for (let i = 0; i < length; i++) {
        const dayData = lastSelectionDaysArr[i];
        const daySurvivedCreatures = dayData.survivedCreatures;

        survivedCreaturesCount.push(dayData.survivedCount);
        dieCreaturesCount.push(dayData.dieCount);
        offspringCreaturesCount.push(dayData.offspringCount);

        averageVelocityArr.push(getParamAverageValue(daySurvivedCreatures.map(e => e.velocity)));
        averageVisibilityArr.push(getParamAverageValue(daySurvivedCreatures.map(e => e.visibilitySize)));
        averageEnergyArr.push(getParamAverageValue(daySurvivedCreatures.map(e => e.energyIntensity)));
        averageSizeArr.push(getParamAverageValue(daySurvivedCreatures.map(e => e.size)));
    }

    const renderRow = (title: string, value: number, paramDifference?: number) => (
        <div className={cl('Row')}>
            <span className='pr-2'>{title}</span>
            <div className='d-flex'>
                <strong className={!paramDifference ? cl('Value-Padding') : undefined}>
                    {fixValue(value)}
                </strong>
                <ColorizeParamDifference paramDifference={paramDifference} />
            </div>
        </div>
    );

    return (
        <section className={cl()}>
            {renderRow('Средняя скорость', getParamAverageValue(averageVelocityArr), getParamChangeDifference(averageVelocityArr))}
            {renderRow('Средняя чувствительность', getParamAverageValue(averageVisibilityArr), getParamChangeDifference(averageVisibilityArr))}
            {renderRow('Средняя энергия', getParamAverageValue(averageEnergyArr), getParamChangeDifference(averageEnergyArr))}
            {renderRow('Средний размер', getParamAverageValue(averageSizeArr), getParamChangeDifference(averageSizeArr))}
            {renderRow('Выжило', getParamAverageValue(survivedCreaturesCount), getParamChangeDifference(survivedCreaturesCount))}
            {renderRow('Погибло', getParamAverageValue(dieCreaturesCount), getParamChangeDifference(dieCreaturesCount))}
            {renderRow('Дало потомство', getParamAverageValue(offspringCreaturesCount), getParamChangeDifference(offspringCreaturesCount))}
        </section>
    );
};

export default DetailsRows;

interface IProps {
    lastSelectionDaysArr: ISelectionResultData[];
}
