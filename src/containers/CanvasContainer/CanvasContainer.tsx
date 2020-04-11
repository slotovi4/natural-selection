import React from 'react';
import { Canvas } from '../../components';
import { connect } from 'react-redux';
import { IRootState, Dispatch } from '../../redux/store';

const CanvasContainer = (props: IProps) => <Canvas {...props} />;

const mapState = (state: IRootState) => ({
    start: state.selection.start,
});

const mapDispatch = (dispatch: Dispatch) => ({
    stopSelection: () => dispatch.selection.stopSelection(),
});

export default connect(mapState, mapDispatch)(CanvasContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;