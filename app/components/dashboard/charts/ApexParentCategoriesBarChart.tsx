"use client";
import Chart from "react-apexcharts";
import { ChartBarType } from "@/types/chart-types";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";

const ApexParentCategoriesBarChart = ({ data }: { data: ChartBarType[] }) => {
  const { mode } = useColorScheme();

  return (
    <>
      {data && (<Chart
        options={{
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
                colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
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
              colors: mode === "dark" ? ["white"] : [chartColors.lightThemeLabel],
            },
            formatter: function (val: any) {
              return "R$ " + val.toFixed(2);
            },
            offsetX: 0,
          },
          grid: {
            borderColor: mode === "dark" ? "#333333" : "#BEBFBF",
          },
          legend: {
            show: false,
          },
        }}
        series={[
          {
            name: "Despesas",
            data: data.map((item) => item.value),
          },
        ]}
        type="bar"
        height={600}
      />
      )}
    </>
  );
};

export default ApexParentCategoriesBarChart;
