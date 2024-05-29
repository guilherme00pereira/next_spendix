"use client";
import Chart from "react-apexcharts";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";
import { ChartBarType } from "@/types/chart-types";

const ApexDailyTransactionsChart = ({ data }: { data: ChartBarType[] }) => {
    return (
        <Chart options={{
            chart: {
                id: "basic-bar",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: data.map((item) => item.name),
                labels: {
                    style: {
                        colors: chartColors.lightThemeLabel,
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: chartColors.lightThemeLabel,
                    },
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: "70%",
                    distributed: true,
                    dataLabels: {
                        position: "top",
                    },
                },
            },
            dataLabels: {
                enabled: true,
                textAnchor: "start",
                style: {
                    colors: ['white'],
                },
                formatter: function (val: any) {
                    return "R$ " + val.toFixed(2);
                },
                offsetX: 0,
            },
            grid: {
                borderColor: "#BEBFBF",
            },
            legend: {
                show: false,
            },
        }}
            series={[{
                name: "series-1",
                data: data.map((item) => item.value),
            }]}
            height="350"
        />
    );
};

export default ApexDailyTransactionsChart;