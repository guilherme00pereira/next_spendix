import { useEffect, useState } from "react";
import { TextField, MenuItem, FormControl, Stack } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Cell, LabelList, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import { CategoryType, ChartBarType, TransactionType } from "@/types/entities";
import { useRouter } from "next/navigation";

const barColor = "#9c27b0";

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
    //TODO: add empty months to chart
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="value" type="number" />
          <XAxis dataKey="name" type="category" width={200} interval={0} tickMargin={5} />
          <Bar dataKey="value" fill={barColor} radius={4} maxBarSize={20}>
            <LabelList dataKey="label" position="top" fill="#333" fontSize={12} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default CategoryTransactionsSixMonthsLineChart;
