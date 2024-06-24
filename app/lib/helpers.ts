import { ChartBarType } from "@/types/chart-types";
import { TransactionType } from "@/types/entities";
import { EndDateEnum, TransactionTypeEnum } from "@/types/enums";
import dayjs from "dayjs";

export const groupTransactionsByDate = (transactions: TransactionType[]) => {
  const groups = new Map<string, TransactionType[]>();
  transactions.forEach((t) => {
    if (t.payments) {
      if (groups.has(t.payments.date)) {
        groups.get(t.payments.date)?.push(t);
      } else {
        groups.set(t.payments.date, [t]);
      }
    } else {
      if (groups.has(t.due_date)) {
        groups.get(t.due_date)?.push(t);
      } else {
        groups.set(t.due_date, [t]);
      }
    }
  });
  return new Map([...groups].sort());
};

export const mapDailyTransactionsToChart = (map: Map<string, TransactionType[]>, type: string) => {
  const chartData: ChartBarType[] = [];
  map.forEach((transactions, day) => {
    const value = transactions.reduce((acc, curr) => {
      return curr.categories?.type === type ? acc + curr.amount : acc;
    }, 0);
    chartData.push({
      name: day,
      value: value,
      label: "",
    });
  });
  return chartData;
};

export const getTransactionsTotals = (transactions: TransactionType[], payed: TransactionType[]) => {
  const totalCashed = payed
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.INCOME)
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);

    const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.INCOME)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalPaidExpenses = payed
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.SPENDINGS)
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.SPENDINGS)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const dailyAverage = totalPaidExpenses / dayjs().date();

  return [totalCashed, totalIncome, totalPaidExpenses, totalExpenses, dailyAverage];
};

export const getSimpleTransactionsTotals = (transactions: TransactionType[]) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.INCOME)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.SPENDINGS)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const dailyAverage = totalExpenses / dayjs().date();

  return [totalIncome, totalExpenses, dailyAverage];
}


export const getStartAndEndingDays = (date: string, end: EndDateEnum) => {
  const startDate = date ? dayjs(date).startOf("M").format("YYYY-MM-DD") : dayjs().startOf("M").format("YYYY-MM-DD");
  const isCurrentMonth = dayjs().format("YYYY-MM") === dayjs(startDate).format("YYYY-MM");
  let endDate = "";
  if (end === EndDateEnum.TODAY && isCurrentMonth) {
    endDate = date ? dayjs(date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
  } else {
    endDate = date ? dayjs(date).endOf("M").format("YYYY-MM-DD") : dayjs().endOf("M").format("YYYY-MM-DD");
  }
  return [startDate, endDate];
};
