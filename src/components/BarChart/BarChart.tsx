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
        labels: [...creatureData.map(e => `speed: ${e.velocity}`)],
        datasets: [
            {
                label: 'Creature speed mutation',
                backgroundColor: 'rgba(63, 81, 181, 0.4)',
                borderColor: '#3f51b5',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(63, 81, 181, 0.6)',
                hoverBorderColor: '#3f51b5',
                data: [...creatureData.map(e => e.creaturesCount)],
            }
        ]
    };

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
        <section>
            <Bar
                data={data}
                options={options}
                height={400}
            />
        </section>
    );
};

export default BarChart;

interface IProps {
    survivedCreatures: ICreatureParams[];
}

interface ICreatureParams {
    velocity: number;
}