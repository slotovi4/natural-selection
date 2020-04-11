import React from 'react';
import { Canvas } from '../../components';
import { connect } from 'react-redux';
import { IRootState, Dispatch } from '../../redux/store';

const CanvasContainer = ({ textModelText, clearTestMoselState }: IProps) => <Canvas />;

const mapState = (state: IRootState) => ({
    textModelText: state.testModel.text,
});

const mapDispatch = (dispatch: Dispatch) => ({
    clearTestMoselState: () => dispatch.testModel.clearTestMoselState(),
});

export default connect(mapState, mapDispatch)(CanvasContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;