import React from 'react';
import { Table, ITableHeader, ITableRow } from '../../Table';
import { ISelectionResultData } from '../SelectionDetails';
import { getParamAverageValue } from '../helpers';

const TableDetails = ({ selection }: IProps) => {
    const headers: ITableHeader[] = [
        { title: 'День' },
        { title: 'Средняя скорость' },
        { title: 'Средний радиус чувствительности' },
        { title: 'Выжило' },
        { title: 'Дало потомство' },
        { title: 'Погибло' },
    ];

    const rows: ITableRow[] = selection.map((selectionResult, i) => {
        const averageVelocity = getParamAverageValue(selectionResult.survivedCreatures.map(e => e.velocity));
        const averageVisibilityRadius = getParamAverageValue(selectionResult.survivedCreatures.map(e => e.visibilityRadius));
        const { survivedCount } = selectionResult;
        const { offspringCount } = selectionResult;
        const { dieCount } = selectionResult;

        return ({
            value: {
                day: `${i + 1}`,
                velocity: parseFloat(averageVelocity.toFixed(2)),
                visibilityRadius: averageVisibilityRadius,
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
