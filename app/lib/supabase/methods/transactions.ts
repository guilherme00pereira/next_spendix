import { createClient } from "@/app/lib/supabase/client";

import { RecurringFormData } from "@/types/entities";
import { IDeleteTransactionData } from "@/types/interfaces";
import dayjs from "dayjs";

// enum QueryType {
//   Full = "full",
//   ByPaymentDate = "by_payment_date",
// }

// const buildQuery = (type?: QueryType) => {
//   const basicFields = `id, amount, due_date, description, draft`;
//   const joinCategories = `categories(*)`;
//   const joinInnerPayments = `payments!inner(*)`;
//   const joinPayments = `payments(*)`;
//   const joinInstallments = `installments: transaction_installments(*)`;

//   switch (type) {
//     case QueryType.Full:
//       return `${basicFields}, ${joinCategories}, ${joinPayments}, ${joinInstallments}`;
//     case QueryType.ByPaymentDate:
//       return `${basicFields}, ${joinCategories}, ${joinInnerPayments}, ${joinInstallments}`;
//     default:
//       return `${basicFields}`;
//   }
// };

const supabase = createClient();

const getInnerPaymentsQuery = `id, amount, due_date, description, draft, categories(*), payments!inner(*), 
                  installments: transaction_installments(*), tags(*)`;
const getDefaultQuery = `id, amount, due_date, description, draft, categories(*), payments(*), installments: transaction_installments(*)`;



const getTransactionsByCategory = async (di: string, df: string, category_id: number) => {
  const { data, error } = await supabase
    .from("transactions")
    .select(getInnerPaymentsQuery)
    .gte("due_date", di)
    .lte("due_date", df)
    .eq("category_id", category_id)
    .order("due_date", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
};

const getOverdueTransactions = async () => {
  const { data, error } = await supabase
    .from("transactions")
    .select(getDefaultQuery)
    .lte("due_date", dayjs().subtract(1, "day").format("YYYY-MM-DD"))
    .is("payment_id", null)
    .order("due_date", { ascending: false })
    .order("category_id");
  if (error) {
    throw error;
  }
  return data;
};

const addReccuringTransaction = async ({ amount, due_date, description, category_id, recurring_times }: RecurringFormData) => {
  const rows = [];
  for (let i = 0; i < recurring_times; i++) {
    let desctext = `${description} (${i + 1}/${recurring_times})`;
    rows.push({
      amount,
      due_date: due_date.add(i, "month").format("YYYY-MM-DD"),
      description: desctext,
      category_id,
      payment_id: null,
    });
  }
  const { data, error } = await supabase.from("transactions").insert(rows).select(getInnerPaymentsQuery);
  if (error) {
    throw error;
  }
  return data;
};



const removeTransaction = async ({ id, payment_id }: IDeleteTransactionData) => {
  const { data, error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) {
    throw error;
  }
  if (payment_id) {
    const { error } = await supabase.from("payments").delete().eq("id", payment_id);
    if (error) {
      throw error;
    }
  }
  return data;
};

const getSumIncomeTransactions = async (di: string, df: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("amount, categories(type)")
    .gte("date", di)
    .lte("date", df)
    .eq("cashed", true)
    .eq("categories.type", "Receita")
    .single();
  if (error) {
    throw error;
  }
  return data;
};

const getTransactionsByCategoriesLastYear = async (category_id: number) => {
  const { data, error } = await supabase
    .from("transactions")
    .select(getDefaultQuery)
    .eq("category_id", category_id)
    .gte("due_date", dayjs().subtract(12, "month").format("YYYY-MM-DD"))
    .lte("due_date", dayjs().add(1, "month").format("YYYY-MM-DD"))
    .order("due_date", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};



const managePaymentMethodUpdateBalance = async (payment_method_id: number, amount: number, type: string) => {
  if (type === "Receita") {
    //await incrementPaymentMethodBalance(payment_method_id, amount);
  } else {
    //await decrementPaymentMethodBalance(payment_method_id, amount);
  }
};

export {
  getTransactionsByCategory,
  getOverdueTransactions,
  addReccuringTransaction,
  removeTransaction,
  getSumIncomeTransactions,
  getTransactionsByCategoriesLastYear as getTransactionsByCategoriesLastSixMonths,
};
