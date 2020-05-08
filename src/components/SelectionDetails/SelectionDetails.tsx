import React from 'react';
import {
    Card,
    Dialog,
    Button,
} from '@material-ui/core';
import { DialogSelection } from './DialogSelection';
import { DetailsRows } from './DetailsRows';
import { cn } from '@bem-react/classname';
import './SelectionDetails.scss';

const SelectionDetails = ({ selectionResultData }: IProps) => {
    const cl = cn('SelectionDetails');
    const [openDetails, setOpenDetails] = React.useState(false);

    return (
        <Card className={cl()}>
            <span className={cl('Title')}>Средние показатели существ по итогу последних дней естественных отборов</span>
            <DetailsRows lastSelectionDaysArr={selectionResultData.map(selection => selection[selection.length - 1])} />

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
                {selectionResultData.map((selection, i) => (
                    <DialogSelection
                        key={`expansion_selection_${i}`}
                        selection={selection}
                        num={i}
                    />))}
            </Dialog>
        </Card>
    );
};

export default SelectionDetails;

interface IProps {
    selectionResultData: ISelectionResultData[][];
}

export interface ISelectionResultData {
    dieCount: number;
    survivedCount: number;
    offspringCount: number;
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
    visibilityRadius: number;
    energyIntensity: number;
}
