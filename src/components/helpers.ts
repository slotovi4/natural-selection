export const getParamChangeDifference = (averageArr: number[]) => {
    const oldAverageValue = getParamAverageValue(averageArr.filter((e, i) => i !== averageArr.length - 1));
    const currentAverageValues = getParamAverageValue(averageArr);
    return currentAverageValues - oldAverageValue;
};

export const getParamAverageValue = (averageArr: number[]) => {
    return averageArr.reduce((a, b) => a + b, 0) / averageArr.length;
};

export const fixValue = (value: number) => parseFloat(value.toFixed(2)); 