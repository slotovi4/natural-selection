import React from 'react';
import { Table, ITableHeader, ITableRow } from '../../../Table';
import { ISelectionResultData } from '../../SelectionDetails';
import { getParamAverageValue } from '../../../helpers';

const TableDetails = ({ selection }: IProps) => {
    const headers: ITableHeader[] = [
        { title: 'День' },
        { title: 'Средняя скорость' },
        { title: 'Средняя чувствительность' },
        { title: 'Выжило' },
        { title: 'Дало потомство' },
        { title: 'Погибло' },
    ];

    const rows: ITableRow[] = selection.map((selectionResult, i) => {
        const { survivedCreatures, survivedCount, offspringCount, dieCount } = selectionResult;

        const averageVelocity = getParamAverageValue(survivedCreatures.map(e => e.velocity));
        const averageVisibilityRadius = getParamAverageValue(survivedCreatures.map(e => e.visibilityRadius));

        return ({
            value: {
                day: `${i + 1}`,
                velocity: parseFloat(averageVelocity.toFixed(2)),
                visibilityRadius: parseFloat(averageVisibilityRadius.toFixed(2)),
                survivedCount,
                offspringCount,
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
