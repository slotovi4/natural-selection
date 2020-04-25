import React from 'react';
import { Card } from '@material-ui/core';
import { cn } from '@bem-react/classname';
import './SelectionDetails.scss';

const SelectionDetails = ({ selectionResultData }: IProps) => {
    const cl = cn('SelectionDetails');
    const { survivedCreatures } = selectionResultData;

    const averageSpeed = survivedCreatures.reduce((a, b) => a + b.velocity, 0) / survivedCreatures.length;

    const renderRow = (title: string, value: string | number) => (
        <div>
            <span>{title}</span>
            <span>{value}</span>
        </div>
    );

    return (
        <Card className={cl()}>
            <span>Показатели существ по итогу последней итерации естественного отбора</span>
            {renderRow('Средняя скорость: ', averageSpeed.toFixed(3))}
            {renderRow("Выжило: ", selectionResultData.survivedCount)}
            {renderRow('Погибло:', selectionResultData.dieCount)}
            {renderRow('Дало потомство:', selectionResultData.offspringCount)}
        </Card>
    );
};

export default SelectionDetails;

interface IProps {
    selectionResultData: ISelectionResultData;
}

interface ISelectionResultData {
    dieCount: number;
    survivedCount: number;
    offspringCount: number;
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
}
