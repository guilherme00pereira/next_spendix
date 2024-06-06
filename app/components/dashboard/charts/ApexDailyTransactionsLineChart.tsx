"use client";
import Chart from "react-apexcharts";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";
import { ApexDailyTransactionsChartProps } from "@/types/interfaces";

const ApexDailyTransactionsChart = ({ incomeData, spendingsData }: ApexDailyTransactionsChartProps) => {
  const { mode } = useColorScheme();

  return (
    <Chart
      options={{
        chart: {
          id: "daily-line",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(value);
            },
            style: {
              colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
            },
          },
        },
        xaxis: {
          type: "category",
          labels: {
            style: {
              colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
            },
            formatter: function (val: any) {
              return val;
            },
          },
        },
        stroke: {
          curve: "straight",
        },
        markers: {
          size: 5,
        },
        legend: {
          labels: {
            colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
          },
        },
      }}
      series={[
        {
          name: "gastos por dia",
          data: spendingsData.map((item) => item.value),
          color: chartColors.spendingColor,
        },
        {
          name: "receitas por dia",
          data: incomeData.map((item) => item.value),
          color: chartColors.incomeColor,
        },
      ]}
      height="350"
    />
  );
};

export default ApexDailyTransactionsChart;
