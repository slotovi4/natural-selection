import React from 'react';
import { ControlSection } from '../../components';
import { IRootState, Dispatch } from '../../redux/store';
import { connect } from 'react-redux';

const ControlSectionContainer = ({ setSelectionStart, clearSelectionState, start }: IProps) => {
    return (
        <ControlSection
            onStartClick={setSelectionStart}
            onResetClick={clearSelectionState}
            disabled={start}
        />
    );
};

const mapState = (state: IRootState) => ({
    start: state.selection.start,
});

const mapDispatch = (dispatch: Dispatch) => ({
    setSelectionStart: () => dispatch.selection.startSelection(),
    clearSelectionState: () => dispatch.selection.clearSelectionState(),
});

export default connect(mapState, mapDispatch)(ControlSectionContainer);

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
