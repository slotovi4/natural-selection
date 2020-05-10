
import { createModel } from '@rematch/core';
import { getSavedControlSectionSettings } from '../../components/ControlSection/helpers';

const initialSettings: IState = {
    creatureCount: 5,
    canMutate: true,
    canMutateVelocity: true,
    canMutateVisibility: false,
    canMutateSize: false,
    mutationChance: 1
};

const initialState: IState = {
    ...initialSettings,
    ...getSavedControlSectionSettings()?.creatureSettings,
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
        setCanMutateSize(state: IState, canMutateSize: IState['canMutateSize']) {
            return { ...state, canMutateSize };
        },
        setMutationChance(state: IState, mutationChance: IState['mutationChance']) {
            return { ...state, mutationChance };
        },
        clearState() {
            return {
                ...initialSettings,
                ...getSavedControlSectionSettings()?.creatureSettings,
            };
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
        setNewCreatureCanMutateSize(canMutateSize: IState['canMutateSize']) {
            this.setCanMutateSize(canMutateSize);
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
    canMutateSize: boolean;
    mutationChance: number;
}