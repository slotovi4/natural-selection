import React from 'react';
import {
    Card,
    Dialog,
    Button,
} from '@material-ui/core';
import { TableDetails } from './TableDetails';
import { ColorizeParamDifference } from './ColorizeParamDifference';
import { cn } from '@bem-react/classname';
import './SelectionDetails.scss';

const SelectionDetails = ({ selectionResultData, finalLastResult, previousSelectionResultData }: IProps) => {
    const cl = cn('SelectionDetails');
    const [openDetails, setOpenDetails] = React.useState(false);
    const { survivedCreatures } = finalLastResult;
    const previousSurvivedCreatures = previousSelectionResultData ? previousSelectionResultData.survivedCreatures : null;

    const averageSpeed = survivedCreatures.reduce((a, b) => a + b.velocity, 0) / survivedCreatures.length; // !!! nan проверка
    const previousAverageSpeed = previousSurvivedCreatures
        ? previousSurvivedCreatures.reduce((a, b) => a + b.velocity, 0) / previousSurvivedCreatures.length
        : null;

    const renderRow = (title: string, value: string | number, paramDifference?: number) => (
        <div className={cl('Row')}>
            <span className='pr-2'>{title}</span>
            <strong>{value}</strong>
            <ColorizeParamDifference paramDifference={paramDifference} />
        </div>
    );

    const getParamChangeDifference = (param: number, previousParam: number | null) => previousParam !== null ? param - previousParam : 0;

    return (
        <Card className={cl()}>
            <span className={cl('Title')}>Показатели существ по итогу последней итерации естественного отбора</span>
            {renderRow('Средняя скорость: ', averageSpeed.toFixed(3), getParamChangeDifference(averageSpeed, previousAverageSpeed))}
            {renderRow('Выжило: ', finalLastResult.survivedCount)}
            {renderRow('Погибло:', finalLastResult.dieCount)}
            {renderRow('Дало потомство:', finalLastResult.offspringCount)}

            <Button
                className='d-block w-100 mt-2'
                variant="contained"
                onClick={() => setOpenDetails(true)}
            >
                Подробная информация
            </Button>

            <Dialog
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                fullWidth
            >
                <TableDetails
                    selectionResultData={selectionResultData}
                />
            </Dialog>
        </Card>
    );
};

export default SelectionDetails;

export interface IProps {
    finalLastResult: ISelectionResultData;
    selectionResultData: ISelectionResultData[][];
    previousSelectionResultData: ISelectionResultData | null;
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
