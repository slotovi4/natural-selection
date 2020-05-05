import React from 'react';
import { Button, CardMedia, Tooltip } from '@material-ui/core';
import { SelectionExpansionPanel, ISelectionProps as SelectionExpansionPanelProps } from './SelectionExpansionPanel';
import { FoodExpansionPanel, IFoodProps as FoodExpansionPanelProps } from './FoodExpansionPanel';
import { CreatureExpansionPanel, ICreatureProps as CreatureExpansionPanelProps } from './CreatureExpansionPanel';
import { cn } from '@bem-react/classname';
import controlImg from './controlImg.jpg';
import './ControlSection.scss';

const ControlSection = ({
    onStartClick,
    onResetClick,
    foodProps,
    creatureProps,
    selectionProps,
    daysLeft,
    disabled,
}: IProps) => {
    const cl = cn('ControlSection');

    return (
        <section className={cl()}>
            <CardMedia
                image={controlImg}
                title="Control Image"
                className={cl('Image')}
            />

            {daysLeft ? (
                <Tooltip title="Дней до конца отбора" aria-label="daysLeft">
                    <span className={cl('Days-Left-Counter')}>{daysLeft}</span>
                </Tooltip>
            ) : null}

            <SelectionExpansionPanel disabled={disabled} {...selectionProps} />
            <CreatureExpansionPanel disabled={disabled} {...creatureProps} />
            <FoodExpansionPanel disabled={disabled} {...foodProps} />

            <div className='p-2'>
                <Button disabled={disabled} variant="contained" color="primary" onClick={onStartClick}>Старт</Button>
                <Button disabled={disabled} variant="contained" onClick={onResetClick} className='ml-2'>Сброс настроек</Button>
            </div>
        </section>
    );
};

export default ControlSection;

interface IProps {
    disabled: boolean;
    daysLeft: number;
    foodProps: FoodExpansionPanelProps;
    creatureProps: CreatureExpansionPanelProps;
    selectionProps: SelectionExpansionPanelProps;
    onResetClick: () => void;
    onStartClick: () => void;
}