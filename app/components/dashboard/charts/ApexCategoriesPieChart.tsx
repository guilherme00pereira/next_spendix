'use client'
import Chart from "react-apexcharts";
import { ChartBarType } from "@/types/chart-types";

const ApexCategoriesPieChart = ({data}: {data: ChartBarType[]}) => {
  const series = data.map((item) => item.value);
  const labels = data.map((item) => item.name);

  return (    
      <Chart
        options={{
          chart: {
            id: "basic-pie",
            toolbar: {
              show: false,
            },
          },
        }} 
        series={series}
        labels={labels}
        type="pie"
        width={400}
      />
    
  );
};

export default ApexCategoriesPieChart;
