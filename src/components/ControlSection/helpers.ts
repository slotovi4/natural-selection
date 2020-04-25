export const checkResetExpansionSettings = <T extends object>(newSettings: T, settings: T) => {
    const res = Object.keys(newSettings).find(key => newSettings[key] !== settings[key]);

    return !!res;
};