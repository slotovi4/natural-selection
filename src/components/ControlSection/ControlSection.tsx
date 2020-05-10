import React from 'react';
import { Button, CardMedia, Tooltip } from '@material-ui/core';
import { SelectionExpansionPanel, ISelectionProps as SelectionExpansionPanelProps } from './SelectionExpansionPanel';
import { FoodExpansionPanel, IFoodProps as FoodExpansionPanelProps } from './FoodExpansionPanel';
import { CreatureExpansionPanel, ICreatureProps as CreatureExpansionPanelProps } from './CreatureExpansionPanel';
import { saveControlSectionSettings, resetSavedControlSectionSettings } from './helpers';
import { cn } from '@bem-react/classname';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
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

    const onResetSettingsClick = () => {
        resetSavedControlSectionSettings();
        onResetClick();
    };

    const onSavaSettingsClick = () => {
        saveControlSectionSettings({
            selectionSettings: selectionProps['selectionSettings'],
            creatureSettings: creatureProps['creatureSettings'],
            foodSettings: foodProps['foodSettings']
        });
    };

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

            <div className='pt-2 pb-2'>
                <Button
                    disabled={disabled}
                    variant="contained"
                    color="primary"
                    onClick={onStartClick}
                    size="small"
                    disableElevation
                >
                    Старт
                </Button>
                <Button
                    disabled={disabled}
                    variant="outlined"
                    onClick={onSavaSettingsClick}
                    className='ml-2'
                    startIcon={<SaveIcon color={disabled ? 'disabled' : 'primary'} />}
                    size="small"
                    disableElevation
                >
                    Сохранить настройки
                </Button>
                <Button
                    disabled={disabled}
                    variant="outlined"
                    onClick={onResetSettingsClick}
                    className='ml-2'
                    startIcon={<DeleteIcon color={disabled ? 'disabled' : 'error'} />}
                    size="small"
                    disableElevation
                >
                    Сброс настроек
                    </Button>
            </div>
        </section>
    );
};

export default ControlSection;

export interface IProps {
    disabled: boolean;
    daysLeft: number;
    foodProps: FoodExpansionPanelProps;
    creatureProps: CreatureExpansionPanelProps;
    selectionProps: SelectionExpansionPanelProps;
    onResetClick: () => void;
    onStartClick: () => void;
}