
import { createModel } from '@rematch/core';

const initialState: IState = {
    start: false,
};

const selection = createModel({
    state: initialState,
    reducers: {
        setStart(state: IState, start: IState["start"]) {
            return { ...state, start };
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
        clearSelectionState() {
            this.clearState();
        },
    }),
});

export default selection;

interface IState {
    start: boolean;
}