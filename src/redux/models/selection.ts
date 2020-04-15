
import { createModel } from '@rematch/core';
import { SelectionSpeed } from '../../components/ControlSection/SelectionExpansionPanel';

const initialState: IState = {
    start: false,
    selectionDays: 10,
    selectionSpeed: SelectionSpeed.X1,
};

const selection = createModel({
    state: initialState,
    reducers: {
        setStart(state: IState, start: IState["start"]) {
            return { ...state, start };
        },
        setSelectionDays(state: IState, selectionDays: IState["selectionDays"]) {
            return { ...state, selectionDays };
        },
        setSelectionSpeed(state: IState, selectionSpeed: IState["selectionSpeed"]) {
            return { ...state, selectionSpeed };
        },
        clearState() {
            return {
                ...initialState,
            };
        },
    },
    effects: dispatch => ({
        startSelection() {
            this.setStart(true);
        },
        stopSelection() {
            this.setStart(false);
        },
        setNewSelectionDays(selectionDays: IState["selectionDays"]) {
            this.setSelectionDays(selectionDays);
        },
        setNewSelectionSpeed(selectionSpeed: IState["selectionSpeed"]) {
            this.setSelectionSpeed(selectionSpeed);
        },
        clearSelectionState() {
            this.clearState();
        },
    }),
});

export default selection;

interface IState {
    start: boolean;
    selectionDays: number;
    selectionSpeed: SelectionSpeed;
}