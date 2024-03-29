import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getExpenseCategoriesTransactionsSum } from "@/lib/supabase/methods/categories";
import { useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";
import { ChartBarType } from "@/types/entities";

const barColor = "#9c27b0";

const ParentCategoriesBarChart = () => {
  const date = useAppStore((state) => state.date);
  const [data, setData] = useState<ChartBarType[]>([]);
  const excludedCategories = [43, 63]
  
  useEffect(() => {
    getExpenseCategoriesTransactionsSum(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"))
      .then((response) => {
        const items = response.filter((item: any) => !excludedCategories.includes(item.id));

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
          <Bar dataKey="value" fill={barColor} radius={4} maxBarSize={20}>
            <LabelList dataKey="label" position="right" fill="#333" fontSize={12} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ParentCategoriesBarChart;
