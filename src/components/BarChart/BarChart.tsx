import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { ChartOptions } from 'chart.js';
import { Bar, ChartComponentProps } from 'react-chartjs-2';
import { getParamAverageValue, fixValue } from '../helpers';

const BarChart = ({ selectionResultData }: IProps) => {
    const [dataSets, setDataSets] = React.useState<ICreatureResult[] | null>(null);
    const [selectedDataSet, setSelectedDataSet] = React.useState(0);
    const lastSelection = selectionResultData[selectionResultData.length - 1] || [];
    const dataSet = dataSets ? dataSets[selectedDataSet] : null;

    React.useEffect(() => {
        const { length } = lastSelection;

        if (length) {
            const averageVelocityArr: number[] = [];
            const averageVisibilityRadiusArr: number[] = [];
            const averageEnergyIntensityArr: number[] = [];

            for (let i = 0; i < length; i++) {
                const { survivedCreatures } = lastSelection[i];

                averageVelocityArr.push(getParamAverageValue(survivedCreatures.map(e => e.velocity)));
                averageVisibilityRadiusArr.push(getParamAverageValue(survivedCreatures.map(e => e.visibilityRadius)));
                averageEnergyIntensityArr.push(getParamAverageValue(survivedCreatures.map(e => e.energyIntensity)));
            }

            const data = createDataSets({
                valuesArr: [averageVelocityArr, averageVisibilityRadiusArr, averageEnergyIntensityArr],
                valuesNames: ['velocity', 'visibilityRadius', 'energyIntensity']
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

        if (name === 'visibilityRadius') {
            return 'чувствительность';
        }

        if (name === 'energyIntensity') {
            return 'энергия';
        }

        return name;
    };

    const barData: ChartComponentProps['data'] | null = dataSet ? {
        labels: [...dataSet.data.map((e, i) => `день: ${i + 1}`)],
        datasets: [{
            label: `Средняя ${dataSet.name}`,
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

    return (
        <section className='w-100'>
            {dataSets ? (
                <ButtonGroup className='mb-2' size="small" color="primary">
                    {dataSets.map(({ name }, i) => (
                        <Button
                            color={selectedDataSet === i ? 'primary' : 'default'}
                            key={`button_data_${i}`}
                            variant="contained"
                            onClick={() => setSelectedDataSet(i)}
                        >
                            {name}
                        </Button>
                    ))}
                </ButtonGroup>
            ) : null}

            {barData ? (
                <div>
                    <Bar
                        data={barData}
                        options={options}
                        height={400}
                    />
                </div>
            ) : null}
        </section>
    );
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
    visibilityRadius: number;
    energyIntensity: number;
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