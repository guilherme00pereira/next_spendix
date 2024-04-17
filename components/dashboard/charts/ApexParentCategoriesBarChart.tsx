import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getExpenseCategoriesTransactionsSum } from "@/lib/supabase/methods/categories";
import { useAppStore } from "@/lib/store";
import dayjs from "dayjs";
import Chart from "react-apexcharts";
import { ChartBarType } from "@/types/entities";
import { Paper, useColorScheme } from "@mui/material";
import PaperHeader from "../surfaces/PaperHeader";


const ApexParentCategoriesBarChart = () => {
  const date = useAppStore((state) => state.date);
  const [data, setData] = useState<ChartBarType[]>([]);
  const excludedCategories = [43, 63]
  const { mode } = useColorScheme();
  
  useEffect(() => {
    getExpenseCategoriesTransactionsSum(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"))
      .then((response) => {
        const items = response.filter((item: any) => !excludedCategories.includes(item.id)).filter((item: any) => item.value > 200);

      const data: ChartBarType[] = items.sort((a: ChartBarType, b: ChartBarType) => a.value - b.value).reverse().map((item: ChartBarType) => {
        return { name: item.name, value: item.value, label: 'R$' + item.value.toFixed(2)};
      });
      setData(data);
    });
  }, [date]);

  return (
    <Paper sx={{p: 1}}>
      <PaperHeader title="Categorias" showSettingButon />
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
    </Paper>
  );
};

export default ApexParentCategoriesBarChart;
