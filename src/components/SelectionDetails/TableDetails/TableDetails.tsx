import React from 'react';
import { Table, ITableHeader, ITableRow } from '../../Table';
import { IProps as ISelectionDetailsProps } from '../SelectionDetails';

const TableDetails = ({ selectionResultData }: IProps) => {
    const headers: ITableHeader[] = [
        { title: 'Номер естественного отбора' },
        { title: 'Количество итераций отбора' },
        { title: 'Средняя скорость существ' }
    ];

    const rows: ITableRow[] = selectionResultData.map((selectionResult, i) => {
        const selectionLength = selectionResult.length;
        const lastIterationSurvivedCreatures = selectionResult[selectionLength - 1].survivedCreatures;
        const averageCreatureSpeed = lastIterationSurvivedCreatures.reduce((a, b) => a + b.velocity, 0) / lastIterationSurvivedCreatures.length;

        return ({
            value: {
                selectionNumber: i,
                iterationsCount: selectionLength,
                averageCreatureSpeed: averageCreatureSpeed.toFixed(3)
            }
        });
    });

    return (
        <Table
            headers={headers}
            rows={rows}
        />
    );
};

export default TableDetails;

interface IProps {
    selectionResultData: ISelectionDetailsProps['selectionResultData'];
}
