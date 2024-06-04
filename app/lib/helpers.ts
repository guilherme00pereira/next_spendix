import { TransactionType } from "@/types/entities";
import { TransactionTypeEnum } from "@/types/enums";
import dayjs from "dayjs";

export const getTotals = (transactions: TransactionType[]) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.INCOME)
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);
  const spendings = transactions.filter(
    (transaction) => transaction.categories?.type === TransactionTypeEnum.SPENDINGS
  );
  const totalPaidSpendings = spendings.reduce((acc, transaction) => acc + (transaction.amount ?? 0), 0);
  const totalSpendings = spendings.reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);
  const dailyAverage = totalPaidSpendings / dayjs().date();
  return [totalIncome, totalPaidSpendings, totalSpendings, dailyAverage];
};

export const getDates = (date: string) => {
  const startDate = date ? dayjs(date).startOf("M").format("YYYY-MM-DD") : dayjs().startOf("M").format("YYYY-MM-DD");
  const endDate = date ? dayjs(date).endOf("M").format("YYYY-MM-DD") : dayjs().endOf("M").format("YYYY-MM-DD");
  return [startDate, endDate];
};
