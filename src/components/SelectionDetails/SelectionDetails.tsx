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

const SelectionDetails = ({ selectionResultData }: IProps) => {
    const cl = cn('SelectionDetails');
    const [openDetails, setOpenDetails] = React.useState(false);
    const lastDaysArr = selectionResultData.map(arr => arr[arr.length - 1]);
    const { length } = lastDaysArr;
    const survivedCreatures: Array<ISelectionResultData['survivedCreatures']> = [];
    const survivedCreaturesCount: number[] = [];
    const dieCreaturesCount: number[] = [];
    const offspringCreaturesCount: number[] = [];
    const averageSpeedArr: number[] = [];

    for (let i = 0; i < length; i++) {
        const dayData = lastDaysArr[i];
        const daySurvivedCreatures = dayData.survivedCreatures;

        survivedCreatures.push(daySurvivedCreatures);
        survivedCreaturesCount.push(dayData.survivedCount);
        dieCreaturesCount.push(dayData.dieCount);
        offspringCreaturesCount.push(dayData.offspringCount);
        averageSpeedArr.push(daySurvivedCreatures.reduce((a, b) => a + b.velocity, 0) / daySurvivedCreatures.length);
    }

    const renderRow = (title: string, value: number, paramDifference?: number) => (
        <div className={cl('Row')}>
            <span className='pr-2'>{title}</span>
            <strong>{parseFloat(value.toFixed(2))}</strong>
            <ColorizeParamDifference paramDifference={paramDifference} />
        </div>
    );

    const getParamChangeDifference = (averageArr: number[]) => {
        const oldAverageValue = getParamAverageValue(averageArr.filter((e,i) => i !== averageArr.length - 1));
        const currentAverageValues = getParamAverageValue(averageArr);
        return currentAverageValues - oldAverageValue;
    };

    const getParamAverageValue = (averageArr: number[]) => {
        return averageArr.reduce((a, b) => a + b, 0) / averageArr.length;
    };

    return (
        <Card className={cl()}>
            <span className={cl('Title')}>Показатели существ по итогу последних дней естественного отбора</span>
            {renderRow('Средняя скорость: ', getParamAverageValue(averageSpeedArr), getParamChangeDifference(averageSpeedArr))}
            {renderRow('Выжило: ', getParamAverageValue(survivedCreaturesCount), getParamChangeDifference(survivedCreaturesCount))}
            {renderRow('Погибло:', getParamAverageValue(dieCreaturesCount), getParamChangeDifference(dieCreaturesCount))}
            {renderRow('Дало потомство:', getParamAverageValue(offspringCreaturesCount), getParamChangeDifference(offspringCreaturesCount))}

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
    selectionResultData: ISelectionResultData[][];
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
