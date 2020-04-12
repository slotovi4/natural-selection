
import { createModel } from '@rematch/core';

const initialState: IState = {
    creatureCount: 5,
};

const creature = createModel({
    state: initialState,
    reducers: {
        setCreatureCount(state: IState, creatureCount: IState["creatureCount"]) {
            return { ...state, creatureCount };
        },
        clearState() {
            return { ...initialState };
        },
    },
    effects: dispatch => ({
        setNewCreatureCount(creatureCount: IState["creatureCount"]) {
            this.setCreatureCount(creatureCount);
        },
        clearFoodState() {
            this.clearState();
        },
    }),
});

export default creature;

interface IState {
    creatureCount: number;
}