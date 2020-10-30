import React from 'react';
import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";
import Typography from '@material-ui/core/Typography';

//TODO Need to fix loading animation of bars
const StatsChart = ({ stats }) => {

    let chartData = {
        options: {
            chart: {
                type: 'bar',
                height: 300,
                toolbar: {
                    show: false
                }

            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            tooltip: {
                enabled: false,
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'middle',
                offsetX: 0,
                offsetY: 0,
            },
            xaxis: {
                categories: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
            grid: {
                show: false,
            },
            series: [{
                data: stats
            }],
        },


    };


    return (
        <Typography component={'div'}>
            <Chart options={chartData.options} series={chartData.options.series} type="bar" height={300} />
        </Typography>
    )
}

export default StatsChart