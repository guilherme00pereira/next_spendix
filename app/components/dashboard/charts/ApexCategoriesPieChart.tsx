'use client'
import Chart from "react-apexcharts";
import { ChartPieType } from "@/types/chart-types";

const ApexCategoriesPieChart = ({series, labels}: ChartPieType) => {
  console.log(series, labels);
  return (    
      <Chart
        options={{
          chart: {
            id: "basic-pie",
            toolbar: {
              show: false,
            },
          },
          labels: labels,
        }} 
        series={series}
        type="donut"
        
      />
    
  );
};

export default ApexCategoriesPieChart;
