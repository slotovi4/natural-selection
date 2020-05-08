
import { createModel } from '@rematch/core';

const initialState: IState = {
    creatureCount: 5,
    canMutate: true,
    canMutateVelocity: true,
    canMutateVisibility: true,
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
        setCanMutateVelocity(state: IState, canMutateVelocity: IState['canMutateVelocity']) {
            return { ...state, canMutateVelocity };
        },
        setCanMutateVisibility(state: IState, canMutateVisibility: IState['canMutateVisibility']) {
            return { ...state, canMutateVisibility };
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
        setNewCreatureCanMutateVelocity(canMutateVelocity: IState['canMutateVelocity']) {
            this.setCanMutateVelocity(canMutateVelocity);
        },
        setNewCreatureCanMutateVisibility(canMutateVisibility: IState['canMutateVisibility']) {
            this.setCanMutateVisibility(canMutateVisibility);
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
    canMutateVelocity: boolean;
    canMutateVisibility: boolean;
    mutationChance: number;
}