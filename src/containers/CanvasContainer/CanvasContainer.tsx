import React from 'react';
import { Canvas } from '../../components';
import { connect } from 'react-redux';
import { IRootState, Dispatch } from '../../redux/store';
import { ISelectionResultData } from '../../redux/models/selection';
import { IState as IFoodSettings } from '../../redux/models/food';
import { IState as IAreaSettings } from '../../redux/models/area';

const CanvasContainer = (props: IProps) => <Canvas {...props} />;

const mapState = (state: IRootState) => ({
    selectionControlParams: state.selection.selectionSettings,
    start: state.selection.start,
    foodControlParams: state.food,
    creatureControlParams: state.creature
});

const mapDispatch = (dispatch: Dispatch) => ({
    stopSelection: () => dispatch.selection.stopSelection(),
    setArea: (area: IAreaSettings['areaParams']) => dispatch.area.setNewArea(area),
    setMaxFoodCount: (maxFoodCount: IFoodSettings['maxFoodCount']) => dispatch.food.setNewMaxFoodCount(maxFoodCount),
    setSelectionResultData: (data: ISelectionResultData[]) => dispatch.selection.setNewSelectionResultData(data),
});

export default connect(mapState, mapDispatch)(CanvasContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;