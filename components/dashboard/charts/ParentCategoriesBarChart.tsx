import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getExpenseCategoriesTransactionsSum } from "@/lib/supabase/methods/categories";
import { useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";
import { ChartBarType } from "@/types/entities";

const ParentCategoriesBarChart = () => {
  const date = useAppStore((state) => state.date);
  const [data, setData] = useState<ChartBarType[]>([]);

  useEffect(() => {
    getExpenseCategoriesTransactionsSum(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")).then((response) => {
      const data: ChartBarType[] = response.sort((a: ChartBarType, b: ChartBarType) => a.value - b.value).reverse().map((item: ChartBarType) => {
        return { name: item.name, value: item.value, label: 'R$' + item.value.toFixed(2)};
      });
      setData(data);
    });
  }, [date]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pb: 2 }}>
        <Typography variant="h6" textAlign="center">
          Despesas
        </Typography>
      </Stack>
      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={200} interval={0} tickMargin={5} />
          <Bar dataKey="value" fill="#8884d8" radius={4}>
            <LabelList dataKey="label" position="right" fill="#000" fontSize={12} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={'#8884d8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ParentCategoriesBarChart;
