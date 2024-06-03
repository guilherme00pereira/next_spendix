'use client'
import Chart from "react-apexcharts";
import { ChartPieType } from "@/types/chart-types";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";

const ApexCategoriesPieChart = ({series, labels}: ChartPieType) => {
  const { mode } = useColorScheme();
  
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
          legend: {
            labels: {
              colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
            },
          },
        }} 
        series={series}
        type="donut"
        width="80%"
      />
    
  );
};

export default ApexCategoriesPieChart;
