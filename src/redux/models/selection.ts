
import { createModel } from '@rematch/core';

const initialState: IState = {
    start: false,
    selectionDays: 10
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
        clearSelectionState() {
            this.clearState();
        },
    }),
});

export default selection;

interface IState {
    start: boolean;
    selectionDays: number;
}