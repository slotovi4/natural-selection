import React from 'react';
import { Table, ITableHeader, ITableRow } from '../../../Table';
import { ISelectionResultData } from '../../SelectionDetails';
import { getParamAverageValue } from '../../../helpers';
import {fixValue} from '../../../helpers';

const TableDetails = ({ selection }: IProps) => {
    const headers: ITableHeader[] = [
        { title: 'День' },
        { title: 'Средн. скорость' },
        { title: 'Средн. чувствительность' },
        { title: 'Средн. энергия' },
        { title: 'Средн. размер' },
        { title: 'Дало потомство' },
        { title: 'Выжило' },
        { title: 'Погибло' },
    ];

    const rows: ITableRow[] = selection.map((selectionResult, i) => {
        const { survivedCreatures, survivedCount, offspringCount, dieCount } = selectionResult;

        const averageVelocity = getParamAverageValue(survivedCreatures.map(e => e.velocity));
        const averageVisibilityRadius = getParamAverageValue(survivedCreatures.map(e => e.visibilitySize));
        const averageEnergy = getParamAverageValue(survivedCreatures.map(e => e.energyIntensity));
        const averageSize = getParamAverageValue(survivedCreatures.map(e => e.size));

        return ({
            value: {
                day: `${i + 1}`,
                velocity: fixValue(averageVelocity),
                visibilityRadius: fixValue(averageVisibilityRadius),
                energy: fixValue(averageEnergy),
                size: fixValue(averageSize),
                offspringCount,
                survivedCount,
                dieCount
            }
        });
    });

    return (
        <Table
            headers={headers}
            rows={rows}
            showParamDifference
        />
    );
};

export default TableDetails;

interface IProps {
    selection: ISelectionResultData[];
}
