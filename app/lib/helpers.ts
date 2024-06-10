import { ChartBarType } from "@/types/chart-types";
import { TransactionType } from "@/types/entities";
import { TransactionTypeEnum } from "@/types/enums";
import dayjs from "dayjs";
import { getAllPaymentMethods } from "@/app/lib/supabase/methods/payment-methods";

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

export const buildSelectPaymentMethods = async () => {
  const res = await getAllPaymentMethods();
  return convertPaymentMethodsToSelect(res);
};

export const convertPaymentMethodsToSelect = (payment_methods: any) => {
  return payment_methods.map((pm: any) => {
    if (pm.credit_cards) {
      return {
        value: pm.id,
        label: pm.credit_cards.name + " | Credit Card",
      };
    }
    if (pm.accounts) {
      return {
        value: pm.id,
        label: pm.accounts.bank,
      };
    }
  });
};

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
