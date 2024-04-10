import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getExpenseCategoriesTransactionsSum } from "@/lib/supabase/methods/categories";
import { useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";
import Chart from "react-apexcharts";
import { ChartBarType } from "@/types/entities";

//TODO: move to a global theme
const barColor = "#49B6F5";

const ApexParentCategoriesBarChart = () => {
  const date = useAppStore((state) => state.date);
  const [data, setData] = useState<ChartBarType[]>([]);
  const excludedCategories = [43, 63]
  
  useEffect(() => {
    getExpenseCategoriesTransactionsSum(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"))
      .then((response) => {
        const items = response.filter((item: any) => !excludedCategories.includes(item.id)).filter((item: any) => item.value > 100);

      const data: ChartBarType[] = items.sort((a: ChartBarType, b: ChartBarType) => a.value - b.value).reverse().map((item: ChartBarType) => {
        return { name: item.name, value: item.value, label: 'R$' + item.value.toFixed(2)};
      });
      setData(data);
    });
  }, [date]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pb: 2 }}>
        <Typography variant="h6" textAlign="center">
          Despesas por categoria
        </Typography>
      </Stack>
      <Chart
        options={{
          chart: {
            id: "basic-bar",
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
              colors: [barColor],
            },
            formatter: function (val: any) {
              return "R$ " + val.toFixed(2);
            },
            offsetX: 0,
          },
          colors: [barColor],
          grid: {
            borderColor: "#f1f1f1",
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
        height={400}
      />
    </>
  );
};

export default ApexParentCategoriesBarChart;
