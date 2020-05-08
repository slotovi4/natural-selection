
import { createModel } from '@rematch/core';

const initialState: IState = {
    creatureCount: 1,
    canMutate: true,
    mutationChance: 1
};

const creature = createModel({
    state: initialState,
    reducers: {
        setCreatureCount(state: IState, creatureCount: IState['creatureCount']) {
            return { ...state, creatureCount };
        },
        setCanMutate(state: IState, canMutate: IState['canMutate']) {
            return { ...state, canMutate };
        },
        setMutationChance(state: IState, mutationChance: IState['mutationChance']) {
            return { ...state, mutationChance };
        },
        clearState() {
            return { ...initialState };
        },
    },
    effects: () => ({
        setNewCreatureCount(creatureCount: IState['creatureCount']) {
            this.setCreatureCount(creatureCount);
        },
        setNewCreatureCanMutate(canMutate: IState['canMutate']) {
            this.setCanMutate(canMutate);
        },
        setNewCreatureMutationChance(mutationChance: IState['mutationChance']) {
            this.setMutationChance(mutationChance);
        },
        clearCreatureState() {
            this.clearState();
        },
    }),
});

export default creature;

export interface IState {
    creatureCount: number;
    canMutate: boolean;
    mutationChance: number;
}