
import { createModel } from '@rematch/core';

const initialState: IState = {
    maxFoodCount: 10,
    minFoodCount: 0,
    foodCount: 10,
};

const food = createModel({
    state: initialState,
    reducers: {
        setMaxFoodCount(state: IState, maxFoodCount: IState['maxFoodCount']) {
            return { ...state, maxFoodCount };
        },
        setFoodCount(state: IState, foodCount: IState['foodCount']) {
            return { ...state, foodCount };
        },
        clearState(state: IState) {
            return { ...state, foodCount: initialState.foodCount };
        },
    },
    effects: () => ({
        setNewMaxFoodCount(maxFoodCount: IState['maxFoodCount']) {
            this.setMaxFoodCount(maxFoodCount);
        },
        setNewFoodCount(foodCount: IState['foodCount']) {
            this.setFoodCount(foodCount);
        },
        clearFoodState() {
            this.clearState();
        },
    }),
});

export default food;

export interface IState {
    maxFoodCount: number;
    minFoodCount: number;
    foodCount: number;
}