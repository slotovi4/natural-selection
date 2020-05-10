import { IProps } from './ControlSection';

const controlSectionSettingsKey = 'controlSectionSettings';

export const checkResetExpansionSettings = <T extends object>(newSettings: T, settings: T) => {
    const res = Object.keys(newSettings).find(key => newSettings[key] !== settings[key]);

    return !!res;
};

export const saveControlSectionSettings = (data: ISaveControlSectionSettingsProps) => {
    localStorage.setItem(controlSectionSettingsKey, JSON.stringify(data));
};

export const resetSavedControlSectionSettings = () => {
    localStorage.removeItem(controlSectionSettingsKey);
};

export const getSavedControlSectionSettings = () => {
    let initialCreatureSettings: ISaveControlSectionSettingsProps | undefined = undefined;
    const settings = localStorage.getItem(controlSectionSettingsKey);

    if (settings) {
        initialCreatureSettings = JSON.parse(settings);
    }

    return initialCreatureSettings;
};

interface ISaveControlSectionSettingsProps {
    selectionSettings: IProps['selectionProps']['selectionSettings'];
    creatureSettings: IProps['creatureProps']['creatureSettings'];
    foodSettings: IProps['foodProps']['foodSettings'];
}