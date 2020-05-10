import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { ChartOptions } from 'chart.js';
import { Bar, ChartComponentProps } from 'react-chartjs-2';
import { getParamAverageValue, fixValue } from '../helpers';
import { cn } from '@bem-react/classname';
import './BarChart.scss';

const BarChart = ({ selectionResultData }: IProps) => {
    const cl = cn('BarChart');
    const [dataSets, setDataSets] = React.useState<ICreatureResult[] | null>(null);
    const [selectedDataSet, setSelectedDataSet] = React.useState(0);
    const lastSelection = selectionResultData[selectionResultData.length - 1] || [];
    const dataSet = dataSets ? dataSets[selectedDataSet] : null;

    React.useEffect(() => {
        const { length } = lastSelection;

        if (length) {
            const averageVelocityArr: number[] = [];
            const averageVisibilitySizeArr: number[] = [];
            const averageEnergyIntensityArr: number[] = [];
            const averageSizeArr: number[] = [];

            for (let i = 0; i < length; i++) {
                const { survivedCreatures } = lastSelection[i];

                averageVelocityArr.push(getParamAverageValue(survivedCreatures.map(e => e.velocity)));
                averageVisibilitySizeArr.push(getParamAverageValue(survivedCreatures.map(e => e.visibilitySize)));
                averageEnergyIntensityArr.push(getParamAverageValue(survivedCreatures.map(e => e.energyIntensity)));
                averageSizeArr.push(getParamAverageValue(survivedCreatures.map(e => e.size)));
            }

            const data = createDataSets({
                valuesArr: [averageVelocityArr, averageVisibilitySizeArr, averageEnergyIntensityArr, averageSizeArr],
                valuesNames: ['velocity', 'visibilitySize', 'energyIntensity', 'size']
            });

            setDataSets(data);
        }
    }, [selectionResultData]);

    const createDataSets = (data: ICreateDataSets) => {
        const { length } = data.valuesArr;
        let creatureDataArr: ICreatureResult[] = [];

        for (let j = 0; j < length; j++) {
            const paramName = data.valuesNames[j];
            const paramsArr = data.valuesArr[j];
            const creatureData: number[] = paramsArr.map(param => fixValue(param));

            creatureDataArr = [
                ...creatureDataArr,
                {
                    data: creatureData,
                    name: checkValueName(paramName)
                }];
        }

        return creatureDataArr;
    };

    const checkValueName = (name: ValueName) => {
        if (name === 'velocity') {
            return 'скорость';
        }

        if (name === 'visibilitySize') {
            return 'чувствительность';
        }

        if (name === 'energyIntensity') {
            return 'энергия';
        }

        if (name === 'size') {
            return 'размер';
        }

        return name;
    };

    const barData: ChartComponentProps['data'] | null = dataSet ? {
        labels: [...dataSet.data.map((e, i) => `день: ${i + 1}`)],
        datasets: [{
            label: `Сред. ${dataSet.name}`,
            backgroundColor: [...dataSet.data.map(val => `rgba(63, 81, 181, ${val / Math.max(...dataSet.data)})`)],
            borderColor: '#3f51b5',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(63, 81, 181, 0.6)',
            hoverBorderColor: '#3f51b5',
            data: [...dataSet.data],
        }]
    } : null;

    const options: ChartOptions = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                }
            }]
        }
    };

    return dataSets && barData ? (
        <section className={cl()}>
            <ButtonGroup className={cl('Buttons-Group')} size="small" color="primary">
                {dataSets.map(({ name }, i) => (
                    <Button
                        color={selectedDataSet === i ? 'primary' : 'default'}
                        key={`button_data_${i}`}
                        variant="outlined"
                        onClick={() => setSelectedDataSet(i)}
                        disableElevation
                    >
                        {name}
                    </Button>
                ))}
            </ButtonGroup>


            <div>
                <Bar
                    data={barData}
                    options={options}
                    height={400}
                />
            </div>
        </section>
    ) : null;
};

export default BarChart;

interface IProps {
    selectionResultData: ISurvivedCreatures[][];
}

interface ISurvivedCreatures {
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
    visibilitySize: number;
    energyIntensity: number;
    size: number;
}

interface ICreatureResult {
    data: number[];
    name: string;
}

interface ICreateDataSets {
    valuesArr: number[][];
    valuesNames: ValueName[];
}

type ValueName = keyof ICreatureParams;