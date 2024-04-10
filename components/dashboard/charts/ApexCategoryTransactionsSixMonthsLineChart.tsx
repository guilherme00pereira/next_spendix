import { useEffect, useState } from "react";
import { TextField, MenuItem, FormControl, Stack } from "@mui/material";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import { CategoryType, ChartBarType, TransactionType } from "@/types/entities";
import { useRouter } from "next/navigation";

//TODO: move to a global theme
const barColor = "#49B6F5";

const CategoryTransactionsSixMonthsLineChart = ({ transactions, categories }: { transactions: TransactionType[]; categories: CategoryType[] }) => {
  const [data, setData] = useState<ChartBarType[]>([]);
  const router = useRouter();

  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    router.push(`/dashboard/categories/${categoryId}`);
  };

  useEffect(() => {
    const data = transactions
      .filter((transaction) => transaction.payments !== null)
      .reduce((acc, transaction) => {
        const month = dayjs(transaction.due_date).format("MMM");
        const index = acc.findIndex((item) => item.name === month);
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
        <FormControl sx={{width: "50%"}}>
          <TextField
            select
            name="category_id"
            label="Trocar categoria: "
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSelect(e)}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
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
            colors: ["white"],
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

export default CategoryTransactionsSixMonthsLineChart;
