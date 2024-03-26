import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Cell, LabelList, XAxis, YAxis } from "recharts";
import { useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";
import { ChartBarType, TransactionType } from "@/types/entities";

const barColor = "#9c27b0";

const CategoryTransactionsSixMonthsLineChart = ({ transactions }: { transactions: TransactionType[] }) => {
  const [data, setData] = useState<ChartBarType[]>([]);

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
  );
};

export default CategoryTransactionsSixMonthsLineChart;
