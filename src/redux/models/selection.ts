
import { createModel } from '@rematch/core';
import { SelectionSpeed } from '../../components/ControlSection/SelectionExpansionPanel';

const initialState: IState = {
    start: false,
    selectionResultData: [],
    selectionSettings: {
        selectionDays: 10,
        selectionSpeed: SelectionSpeed.X10,
    }
};

const selection = createModel({
    state: initialState,
    reducers: {
        setStart(state: IState, start: IState['start']) {
            return { ...state, start };
        },
        setSelectionDays(state: IState, selectionDays: ISelectionSettings['selectionDays']) {
            return { ...state, selectionSettings: { ...state.selectionSettings, selectionDays } };
        },
        setSelectionSpeed(state: IState, selectionSpeed: ISelectionSettings['selectionSpeed']) {
            return { ...state, selectionSettings: { ...state.selectionSettings, selectionSpeed } };
        },
        setSelectionResultData(state: IState, selectionResultData: ISelectionResultData[]) {
            return {...state, selectionResultData: [...state.selectionResultData, selectionResultData]};
        },
        clearState() {
            return {
                ...initialState,
            };
        },
    },
    effects: () => ({
        startSelection() {
            this.setStart(true);
        },
        stopSelection() {
            this.setStart(false);
        },
        setNewSelectionDays(selectionDays: ISelectionSettings['selectionDays']) {
            this.setSelectionDays(selectionDays);
        },
        setNewSelectionSpeed(selectionSpeed: ISelectionSettings['selectionSpeed']) {
            this.setSelectionSpeed(selectionSpeed);
        },
        setNewSelectionResultData(selectionResultData: ISelectionResultData[]) {
            this.setSelectionResultData(selectionResultData);
        },
        clearSelectionState() {
            this.clearState();
        },
    }),
});

export default selection;

export interface IState {
    start: boolean;
    selectionSettings: ISelectionSettings;
    selectionResultData: ISelectionResultData[][];
}

export interface ISelectionSettings {
    selectionDays: number;
    selectionSpeed: SelectionSpeed;
}

export interface ISelectionResultData {
    dieCount: number;
    survivedCount: number;
    offspringCount: number;
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
}