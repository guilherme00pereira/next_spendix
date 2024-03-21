import { CategoryType, PaymentType, TransactionType } from "@/types/entities";
import { latinCharacters } from "./data";
import { getAllPaymentMethods } from "./supabase/methods/payment-methods";

const amountFormatter = (v: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(v);
};

const convertNameToSlug = (name: string) => {
  name = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return name
    .split("")
    .map((char) => latinCharacters[char] || char)
    .join("");
};

const groupTransactionsByDate = (transactions: TransactionType[]) => {
  const groups = new Map<string, TransactionType[]>();
  transactions.forEach((t) => {
    if (t.due_date) {
      if (groups.has(t.due_date)) {
        groups.get(t.due_date)?.push(t);
      } else {
        groups.set(t.due_date, [t]);
      }
    }
  });
  return new Map([...groups].sort());
};

const transactionConverterResponseToType = ({
  id,
  amount,
  due_date,
  description,
  cashed,
  categories,
  payments,
}: {
  id: number;
  amount: number;
  due_date: string;
  description: string | null;
  cashed: boolean;
  categories: CategoryType | null;
  payments: PaymentType | null;
}): TransactionType => {
  return {
    id,
    amount,
    due_date,
    description: description || "",
    cashed,
    categories,
    payments,
    installments: 1,
  };
};

const buildSelectPaymentMethods = async () => {
  const res = await getAllPaymentMethods();
  return convertPaymentMethodsToSelect(res);
}

const convertPaymentMethodsToSelect = (payment_methods: any) => {
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

export { 
  amountFormatter, 
  groupTransactionsByDate, 
  transactionConverterResponseToType, 
  convertPaymentMethodsToSelect, 
  convertNameToSlug,
  buildSelectPaymentMethods
};
