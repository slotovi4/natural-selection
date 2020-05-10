
import { createModel } from '@rematch/core';
import { SelectionSpeed } from '../../components/ControlSection/SelectionExpansionPanel';
import { getSavedControlSectionSettings } from '../../components/ControlSection/helpers';

const initialSettings: IState['selectionSettings'] = {
    selectionDays: 10,
    selectionSpeed: SelectionSpeed.X10,
};

const initialState: IState = {
    start: false,
    daysLeft: 0,
    selectionResultData: [],
    selectionSettings: {
        ...initialSettings,
        ...getSavedControlSectionSettings()?.selectionSettings,
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
            return { ...state, selectionResultData: [...state.selectionResultData, selectionResultData] };
        },
        setDaysLeft(state: IState, daysLeft: IState['daysLeft']) {
            return { ...state, daysLeft };
        },
        clearState() {
            return {
                ...initialState,
                selectionSettings: {
                    ...initialSettings,
                    ...getSavedControlSectionSettings()?.selectionSettings
                }
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
        setNewDaysLeft(daysLeft: IState['daysLeft']) {
            this.setDaysLeft(daysLeft);
        },
        clearSelectionState() {
            this.clearState();
        },
    }),
});

export default selection;

export interface IState {
    start: boolean;
    daysLeft: number;
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
    visibilitySize: number;
    energyIntensity: number;
    size: number;
}