import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { ChartOptions } from 'chart.js';
import { Bar, ChartComponentProps } from 'react-chartjs-2';

const BarChart = ({ survivedCreatures }: IProps) => {
    const [dataSets, setDataSets] = React.useState<ICreatureResult[] | null>(null);
    const [selectedDataSet, setSelectedDataSet] = React.useState(0);
    const dataSet = dataSets ? dataSets[selectedDataSet] : null;

    React.useEffect(() => {
        if (survivedCreatures.length) {
            const velocityArr = survivedCreatures.map(creature => creature.velocity);
            const visibilityRadiusArr = survivedCreatures.map(creature => creature.visibilityRadius);

            const data = createDataSets({
                valuesArr: [velocityArr, visibilityRadiusArr],
                valuesNames: ['velocity', 'visibilityRadius']
            });

            setDataSets(data);
        }
    }, [survivedCreatures]);

    const createDataSets = (data: ICreateDataSets) => {
        const { length } = data.valuesArr;
        let creatureDataArr: ICreatureResult[] = [];

        for (let j = 0; j < length; j++) {
            const paramName = data.valuesNames[j];
            const paramsArr = data.valuesArr[j];
            const uniqueParamsArr = paramsArr.filter((e, i) => paramsArr.indexOf(e) === i);
            let creatureData: ICreatureData[] = [];

            for (let i = 0; i < uniqueParamsArr.length; i++) {
                const paramValue = uniqueParamsArr[i];

                creatureData.push({
                    creaturesCount: survivedCreatures.filter(creature => creature[paramName] === paramValue).length,
                    value: paramValue,
                });
            }

            creatureData = creatureData.sort((a, b) => a.value - b.value);
            creatureDataArr = [...creatureDataArr, { data: creatureData, name: checkValueName(paramName) }];
        }

        return creatureDataArr;
    };

    const checkValueName = (name: ValueName) => {
        if (name === 'velocity') {
            return 'speed';
        }

        if (name === 'visibilityRadius') {
            return 'visibility';
        }

        return name;
    };

    const barData: ChartComponentProps['data'] | null = dataSet ? {
        labels: [...dataSet.data.map(e => `${dataSet.name}: ${e.value}`)],
        datasets: [{
            label: `Creature ${dataSet.name} mutation`,
            backgroundColor: 'rgba(63, 81, 181, 0.4)',
            borderColor: '#3f51b5',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(63, 81, 181, 0.6)',
            hoverBorderColor: '#3f51b5',
            data: [...dataSet.data.map(e => e.creaturesCount)],
        }]
    } : null;

    const options: ChartOptions = {
        maintainAspectRatio: false,
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
                <ButtonGroup size="small" color="primary">
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
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
    visibilityRadius: number;
}

interface ICreatureData {
    creaturesCount: number;
    value: number;
}

interface ICreatureResult {
    data: ICreatureData[];
    name: string;
}

interface ICreateDataSets {
    valuesArr: number[][];
    valuesNames: ValueName[];
}

type ValueName = keyof ICreatureParams;