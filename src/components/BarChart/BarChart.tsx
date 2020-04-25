import React from 'react';
import { ChartOptions } from 'chart.js';
import { Bar, ChartComponentProps } from 'react-chartjs-2';

const BarChart = ({ survivedCreatures }: IProps) => {
    const velocityArr = survivedCreatures.map(creature => creature.velocity);
    const uniqueVelocity = velocityArr.filter((e, i) => velocityArr.indexOf(e) === i);

    let creatureData = [];
    for (let i = 0; i < uniqueVelocity.length; i++) {
        const velocity = uniqueVelocity[i];

        creatureData.push({
            creaturesCount: survivedCreatures.filter(creature => creature.velocity === velocity).length,
            velocity
        });
    }

    creatureData = creatureData.sort((a, b) => a.velocity - b.velocity);

    const data: ChartComponentProps["data"] = {
        labels: [...creatureData.map(e => e.velocity)],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [...creatureData.map(e => e.creaturesCount), 5],
                barPercentage: 1,
                stack: '1'
            }
        ]
    };

    const options: ChartOptions = {
        maintainAspectRatio: false,
        // scales: {
        //     xAxes: [{
        //         stacked: true
        //     }],
        //     yAxes: [{
        //         stacked: true
        //     }]
        // }
    };

    return (
        <div>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
};

export default BarChart;

interface IProps {
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
}