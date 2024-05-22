"use client";
import { useMemo, useState } from "react";
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Stack, Button } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import { ChartBarType } from "@/types/chart-types";
import { CategoryType, TransactionType } from "@/types/entities";
import { useRouter } from "next/navigation";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useCategoryDetailContext } from "@/app/lib/contexts";

dayjs.extend(weekOfYear);

const CategoryTransactionsPerPeriodLineChart = ({
  transactions,
  categories,
}: {
  transactions: TransactionType[];
  categories: CategoryType[];
}) => {
  const { groupByMonth, setGroupByMonth } = useCategoryDetailContext();
  const router = useRouter();
  const { mode } = useColorScheme();

  const handleChangeSelect = (event: SelectChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    router.push(`/dashboard/categories/${categoryId}`);
  };

  const data = useMemo(() => {
    const data = transactions.reduce((acc, transaction) => {
      const period = groupByMonth
        ? dayjs(transaction.due_date).format("MMM")
        : "semana " + dayjs(transaction.due_date).week().toString();
      const index = acc.findIndex((item: any) => item.name === period);
      if (index === -1) {
        acc.push({ name: period, value: transaction.amount, label: "R$" + transaction.amount });
      } else {
        acc[index].value += transaction.amount;
        acc[index].label = "R$" + acc[index].value.toFixed(2);
      }
      return acc;
    }, [] as ChartBarType[]);
    const periods = groupByMonth ? data.reverse() : data.reverse().slice(10);
    return periods;
  }, [groupByMonth, transactions]);

  return (
    <PaperContainer>
      <PaperHeader title="Evolução mensal">
        <Button variant="contained" size="small" color="primary" onClick={() => setGroupByMonth(!groupByMonth)}>
          Agrupar por Semana
        </Button>
      </PaperHeader>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
        <FormControl sx={{ width: "60%" }} size="small">
          <InputLabel>Trocar categoria </InputLabel>
          <Select
            name="category_id"
            size="small"
            onChange={(e: SelectChangeEvent<HTMLInputElement>) => handleChangeSelect(e)}
            input={<OutlinedInput label="Trocar Categoria" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 500,
                  width: 250,
                },
              },
            }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.slug}>
                <ListItemText primary={category.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Chart
        options={{
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: data.map((item) => item.name),
            labels: {
              style: {
                colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
              },
              rotate: -45,
              rotateAlways: true,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
              },
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
    </PaperContainer>
  );
};

export default CategoryTransactionsPerPeriodLineChart;
