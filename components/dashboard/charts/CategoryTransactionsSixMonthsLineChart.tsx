import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Cell, LabelList } from "recharts";
import { useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";
import {ChartBarType, TransactionType} from "@/types/entities";

const CategoryTransactionsSixMonthsLineChart = ({transactions}: {transactions: TransactionType[]}) => {
  const [data, setData] = useState<ChartBarType[]>([]);

  useEffect(() => {
    const sixMonthsAgo = dayjs().subtract(6, "month");
    const data = transactions.filter((t) => dayjs(t.due_date).isAfter(sixMonthsAgo)).reduce((acc, transaction) => {
      const month = dayjs(transaction.due_date).format("MMM");
      const index = acc.findIndex((item) => item.name === month);
      if (index === -1) {
        acc.push({name: month, value: transaction.amount, label: 'R$' + transaction.amount});
      } else {
        acc[index].value += transaction.amount;
        acc[index].label = 'R$' + acc[index].value;
      }
      return acc;
    }, [] as ChartBarType[]);
    console.log(data)
    setData(data);
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
        <Bar dataKey="value" fill="#237B33" radius={4} maxBarSize={20}>
          <LabelList dataKey="label" position="right" fill="#333" fontSize={12} />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={'#237B33'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

  );
};

export default CategoryTransactionsSixMonthsLineChart;