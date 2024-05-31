"use client";
import Chart from "react-apexcharts";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";
import { ChartBarType } from "@/types/chart-types";

const ApexDailyTransactionsChart = ({ data }: { data: ChartBarType[] }) => {
  return (
    <Chart
      options={{
        chart: {
          id: "daily-line",
          toolbar: {
            show: false,
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
          },
        },
        xaxis: {
          type: "datetime",
        },
        stroke: {
          curve: "smooth",
        },
      }}
      series={[
        {
          name: "series-1",
          data: data.map((item) => item.value),
        },
      ]}
      height="350"
    />
  );
};

export default ApexDailyTransactionsChart;
