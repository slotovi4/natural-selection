
import { createModel } from '@rematch/core';
import {IArea} from '../../components/Canvas/models/interface';

const initialState: IState = {
    areaParams: null,
};

const area = createModel({
    state: initialState,
    reducers: {
        setArea(state: IState, areaParams: IArea) {
            return { ...state, areaParams };
        },
        clearState() {
            return {...initialState};
        },
    },
    effects: dispatch => ({
        setNewArea(areaParams: IArea) {
            this.setArea(areaParams);
        },
        clearAreaState() {
            this.clearState();
        },
    }),
});

export default area;

interface IState {
    areaParams: IArea | null;
}