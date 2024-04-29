'use client'
import Chart from "react-apexcharts";
import { ChartBarType } from "@/types/entities";
import { useColorScheme } from "@mui/material";


const ApexParentCategoriesBarChart = ({data}: {data: ChartBarType[]}) => {
  const { mode } = useColorScheme();

  return (
    
      <Chart
        options={{
          chart: {
            id: "basic-bar",
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: data.map((item) => item.name),
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
              colors: mode === "dark" ? ["#BEBFBF"] : ["#333333"],
            },
            formatter: function (val: any) {
              return "R$ " + val.toFixed(2);
            },
            offsetX: 0,
          },
          colors: ["#22A0C7"],
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
        height={460}
      />
    
  );
};

export default ApexParentCategoriesBarChart;
