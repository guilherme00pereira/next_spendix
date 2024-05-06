'use client'
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Stack, useColorScheme } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import { ChartBarType } from "@/types/chart-types";
import { CategoryType, TransactionType } from "@/types/entities";
import { useRouter } from "next/navigation";


const CategoryTransactionsPerPeriodLineChart = ({ transactions, categories }: { transactions: TransactionType[]; categories: CategoryType[] }) => {
  const [data, setData] = useState<ChartBarType[]>([]);
  const router = useRouter();
  const { mode } = useColorScheme();

  const handleChangeSelect = (event: SelectChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    router.push(`/dashboard/categories/${categoryId}`);
  };

  useEffect(() => {
    const data = transactions
      .reduce((acc, transaction) => {
        const month = dayjs(transaction.due_date).format("MMM");
        const index = acc.findIndex((item: any) => item.name === month);
        if (index === -1) {
          acc.push({ name: month, value: transaction.amount, label: "R$" + transaction.amount });
        } else {
          acc[index].value += transaction.amount;
          acc[index].label = "R$" + acc[index].value.toFixed(2);
        }
        return acc;
      }, [] as ChartBarType[]);
    setData(data.reverse());
    //TODO: set projection for actual month
  }, []);

  return (
      <>
      
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
        <FormControl sx={{width: "50%"}} size="small">
        <InputLabel id="demo-multiple-checkbox-label">Trocar categoria: </InputLabel>
          <Select
            name="category_id"
            size="small"
            onChange={(e: SelectChangeEvent<HTMLInputElement>) => handleChangeSelect(e)}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Chart options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: data.map((item) => item.name),
        },
        yaxis: {
          labels: {
            formatter: function (val: any) {
              return val;
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            barHeight: "75%",
            distributed: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "middle",
          style: {
            colors: mode === "dark" ? ["#BEBFBF"] : ["#333333"],
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
        tooltip: {
          enabled: false,
        },
      }}
      series={[
        {
          name: "Despesas",
          data: data.map((item) => item.value),
        },
      ]}
      type="bar"
      height={300}
      />
    </>    
  );
};

export default CategoryTransactionsPerPeriodLineChart;
