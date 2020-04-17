import React from 'react';
import { ChartOptions } from 'chart.js';
import { Line, LinearComponentProps } from 'react-chartjs-2';

const Chart = () => {
    const data: LinearComponentProps["data"] = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d");

        if (ctx) {
            const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
            gradientStroke.addColorStop(0, '#80b6f4');
            gradientStroke.addColorStop(1, 'white');

            const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
            return {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Active Users",
                    borderColor: "#f96332",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#f96332",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
                }]
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
            mode: "nearest",
            intersect: false,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
        },
        responsive: true,
        scales: {
            yAxes: [{
                display: false,
                ticks: {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }],
            xAxes: [{
                display: false,
                ticks: {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }]
        },
        layout: {
            padding: { left: 0, right: 0, top: 15, bottom: 15 }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;
