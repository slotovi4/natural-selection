import React from 'react';
import { Canvas } from '../../components';
import { connect } from 'react-redux';
import { IRootState, Dispatch } from '../../redux/store';
import { IArea } from '../../components/Canvas/models/interface';

const CanvasContainer = (props: IProps) => <Canvas {...props} />;

const mapState = (state: IRootState) => ({
    start: state.selection.start,
});

const mapDispatch = (dispatch: Dispatch) => ({
    stopSelection: () => dispatch.selection.stopSelection(),
    setArea: (area: IArea) => dispatch.area.setNewArea(area),
});

export default connect(mapState, mapDispatch)(CanvasContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;