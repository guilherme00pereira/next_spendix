import { TransactionType } from "@/types/entities";
import { latinCharacters } from "./data";
import { getAllPaymentMethods } from "./supabase/methods/payment-methods";
import { ChartBarType } from "@/types/chart-types";

export const amountFormatter = (v: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(v);
};

export const convertNameToSlug = (name: string) => {
  name = name
    .split("")
    .map((char) => latinCharacters[char] || char)
    .join("");
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

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

export const calculatePercentageFromPrevious = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
}

export const serializeToServeActions = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};