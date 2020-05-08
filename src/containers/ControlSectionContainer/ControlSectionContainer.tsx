import React from 'react';
import { ControlSection } from '../../components';
import { IRootState, Dispatch } from '../../redux/store';
import { ISelectionSettings } from '../../redux/models/selection';
import { IState as ICreatureSettings } from '../../redux/models/creature';
import { IState as IFoodSettings } from '../../redux/models/food';
import { connect } from 'react-redux';

const ControlSectionContainer = ({
    start,
    setSelectionStart,
    clearSelectionState,
    clearFoodState,
    clearCreatureState,
    setFoodCount,
    setCreatureCount,
    foodSettings,
    creatureSettings,
    selectionSettings,
    setSelectionDaysCount,
    setSelectionSpeed,
    setCreatureCanMutate,
    setCreatureMutationChance,
    setCreatureCanMutateVisibility,
    setCreatureCanMutateVelocity,
    daysLeft,
}: IProps) => {
    return (
        <ControlSection
            onStartClick={setSelectionStart}
            disabled={start}
            daysLeft={daysLeft}
            onResetClick={() => {
                clearSelectionState();
                clearFoodState();
                clearCreatureState();
            }}
            foodProps={{ 
                foodSettings, 
                setFoodCount 
            }}
            creatureProps={{ 
                creatureSettings, 
                setCreatureCount, 
                setCreatureCanMutate, 
                setCreatureMutationChance, 
                setCreatureCanMutateVisibility, 
                setCreatureCanMutateVelocity 
            }}
            selectionProps={{ 
                selectionSettings, 
                setSelectionDaysCount, 
                setSelectionSpeed 
            }}
        />
    );
};

const mapState = (state: IRootState) => ({
    start: state.selection.start,
    foodSettings: state.food,
    creatureSettings: state.creature,
    selectionSettings: state.selection.selectionSettings,
    daysLeft: state.selection.daysLeft,
});

const mapDispatch = (dispatch: Dispatch) => ({
    setSelectionStart: () => dispatch.selection.startSelection(),
    setFoodCount: (foodCount: IFoodSettings['foodCount']) => dispatch.food.setNewFoodCount(foodCount),
    setCreatureCount: (creatureCount: ICreatureSettings['creatureCount']) => dispatch.creature.setNewCreatureCount(creatureCount),
    setSelectionDaysCount: (daysCount: ISelectionSettings['selectionDays']) => dispatch.selection.setNewSelectionDays(daysCount),
    setSelectionSpeed: (selectionSpeed: ISelectionSettings['selectionSpeed']) => dispatch.selection.setNewSelectionSpeed(selectionSpeed),
    setCreatureCanMutate: (canMutate: ICreatureSettings['canMutate']) => dispatch.creature.setNewCreatureCanMutate(canMutate),
    setCreatureCanMutateVelocity: (canMutateVelocity: ICreatureSettings['canMutateVelocity']) => dispatch.creature.setNewCreatureCanMutateVelocity(canMutateVelocity),
    setCreatureCanMutateVisibility: (canMutateVisibility: ICreatureSettings['canMutateVisibility']) => dispatch.creature.setNewCreatureCanMutateVisibility(canMutateVisibility),
    setCreatureMutationChance: (mutationChance: ICreatureSettings['mutationChance']) => dispatch.creature.setNewCreatureMutationChance(mutationChance),
    clearSelectionState: () => dispatch.selection.clearSelectionState(),
    clearFoodState: () => dispatch.food.clearFoodState(),
    clearCreatureState: () => dispatch.creature.clearCreatureState(),
});

export default connect(mapState, mapDispatch)(ControlSectionContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
