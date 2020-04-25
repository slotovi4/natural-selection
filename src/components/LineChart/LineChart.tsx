import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { ChartOptions, ChartDataSets, Chart as ChartJs } from 'chart.js';
import { Line, LinearComponentProps } from 'react-chartjs-2';

const LineChart = ({ selectionResultData }: IProps) => {
    const [combineCharts, setCombineCharts] = React.useState(false);

    const createChartData: LinearComponentProps["data"] = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");

        if (ctx) {
            const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
            gradientStroke.addColorStop(0, '#80b6f4');
            gradientStroke.addColorStop(1, 'white');

            const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, "rgba(63, 81, 181, 0.4)");

            const dataSetsParams = {
                borderColor: "#3f51b5",
                pointBorderColor: "black",
                pointBackgroundColor: "white",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 2,
            };

            const combineDataSets: ChartDataSets[] = [];
            let labels: number[] = [];
            let survivedCount: number[] = [];
            let offspringCount: number[] = [];

            for (let i = 0; i < selectionResultData.length; i++) {
                const survived = selectionResultData[i].map(e => e.survivedCount);
                const offspring = selectionResultData[i].map(e => e.offspringCount);

                labels = [...labels, ...selectionResultData[i].map((e, num) => num)];
                survivedCount = [...survivedCount, ...survived];
                offspringCount = [...offspringCount, ...offspring];

                if (combineCharts) {
                    combineDataSets.push({
                        label: `Survived count (selection: ${i})`,
                        data: survived,
                        ...dataSetsParams
                    });

                    combineDataSets.push({
                        label: `Offspring count (selection: ${i})`,
                        data: offspring,
                        ...dataSetsParams
                    });
                }
            }

            return {
                labels: combineCharts ? labels.filter((e, j) => labels.indexOf(e) === j) : labels,
                datasets: combineCharts ? combineDataSets : [
                    {
                        label: "Survived count",
                        data: survivedCount,
                        ...dataSetsParams
                    },
                    {
                        label: "Offspring count",
                        data: offspringCount,
                        ...dataSetsParams
                    }
                ]
            };
        }

        return {};
    };

    const options: ChartOptions = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            bodySpacing: 4,
            mode: "index",
            intersect: false,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
        },
        responsive: true,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    min: 0,
                    stepSize: 1,
                },
                // gridLines: {
                //     zeroLineColor: "transparent",
                //     drawTicks: false,
                //     display: false,
                //     drawBorder: false
                // }
            }],
            xAxes: [{
                display: true,
            }]
        },
        layout: {
            padding: 20,
        },
    };

    const drawChartDividingLine = (chart: Chart) => {
        if (selectionResultData.length) {
            const { ctx, chartArea } = chart;
            let selectionsDaysCountArray: number[] = [];

            for (let i = 0; i < selectionResultData.length; i++) {
                selectionsDaysCountArray = [...selectionsDaysCountArray, selectionResultData[i].length];
            }

            const labelItems: ILabelItem[] = (chart as any).scales['x-axis-0']._labelItems;

            if (ctx && chartArea && labelItems) {
                for (let i = 0; i < labelItems.length; i++) {
                    if (labelItems[i].label === '0') {

                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(labelItems[i].x, chartArea.top);
                        ctx.lineTo(labelItems[i].x, chartArea.bottom);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#ff0000';
                        ctx.stroke();
                    }
                }
            }
        }
    };

    ChartJs.pluginService.register({
        afterDraw: drawChartDividingLine
    });

    return (
        <section>
            <FormControlLabel
                control={
                    <Switch
                        checked={combineCharts}
                        onChange={() => setCombineCharts(!combineCharts)}
                        name="combineChartsSwitch"
                        color="primary"
                    />
                }
                label="Combine charts"
            />
            
            <Line
                data={createChartData}
                options={options}
                height={200}
            />
        </section>
    );
};

export default LineChart;

interface IProps {
    selectionResultData: IDayResult[][];
}

interface IDayResult {
    dieCount: number;
    survivedCount: number;
    offspringCount: number;
}

interface ILabelItem {
    x: number;
    y: number;
    label: string;
}