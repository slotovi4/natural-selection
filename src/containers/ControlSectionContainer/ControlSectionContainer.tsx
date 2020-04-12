import React from 'react';
import { ControlSection } from '../../components';
import { IRootState, Dispatch } from '../../redux/store';
import { connect } from 'react-redux';

const ControlSectionContainer = ({ 
    setSelectionStart, 
    clearSelectionState,
    setFoodCount,
    start,
    food,
}: IProps) => {
    return (
        <ControlSection
            onStartClick={setSelectionStart}
            onResetClick={clearSelectionState}
            setFoodCount={setFoodCount}
            disabled={start}
            food={food}
        />
    );
};

const mapState = (state: IRootState) => ({
    start: state.selection.start,
    food: state.food,
});

const mapDispatch = (dispatch: Dispatch) => ({
    setSelectionStart: () => dispatch.selection.startSelection(),
    setFoodCount: (foodCount: number) => dispatch.food.setNewFoodCount(foodCount),
    clearSelectionState: () => dispatch.selection.clearSelectionState(),
});

export default connect(mapState, mapDispatch)(ControlSectionContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
