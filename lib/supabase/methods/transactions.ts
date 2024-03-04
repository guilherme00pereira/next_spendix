import { supabase } from "@/lib/supabase/supabase-client";
import { TransactionFormData, TransactionUpdateStatusProps, RecurringFormData } from "@/types/entities";
import dayjs from "dayjs";

const getQuery = "id, amount, due_date, description, categories(*), payments(*)";

const getTransactions = async (initial_date: string, final_date: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .select(getQuery)
    .gte("due_date", initial_date)
    .lte("due_date", final_date)
    .order("due_date", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
};

const getTransactionsByCategory = async (di: string, df: string, category_id: number) => {
  const { data, error } = await supabase
    .from("transactions")
    .select(getQuery)
    .gte("due_date", di)
    .lte("due_date", df)
    .eq("category_id", category_id)
    .order("due_date", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
};

const addTransaction = async ({
  amount,
  due_date,
  description,
  cashed,
  category_id,
  payment_date,
  payed_amount,
  payment_method_id,
  in_installments,
  installments,
}: TransactionFormData) => {
    let pay_id = await managePaymentRecord(cashed, payment_date, payed_amount, payment_method_id);
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        amount,
        due_date: due_date.format("YYYY-MM-DD"),
        description,
        category_id,
        installments: in_installments ? installments : 1,
        payment_id: pay_id,
      })
      .select(getQuery);

    if (error) {
      throw error;
    }
    return data;
};

const addReccuringTransaction = async ({
  amount,
  due_date,
  description,
  category_id,
  recurring_times,
}: RecurringFormData) => {
  const rows = [];
  for (let i = 0; i < recurring_times; i++) {
    let desctext = `${description} (${i + 1}/${recurring_times})`;
    rows.push({
      amount,
      due_date: due_date.add(i, "month").format("YYYY-MM-DD"),
      description: desctext,
      category_id,
      installments: 1,
      payment_id: null,
    });
  }
  const { data, error } = await supabase.from("transactions").insert(rows).select(getQuery);
  if (error) {
    throw error;
  }
  return data;
}

const editTransaction = async ({
  id,
  amount,
  cashed,
  due_date,
  description,
  category_id,
  payment_date,
  payed_amount,
  payment_method_id,
}: TransactionFormData) => {
  let pay_id = await managePaymentRecord(cashed, payment_date, payed_amount, payment_method_id);
  const { data, error } = await supabase
    .from("transactions")
    .update({
      amount,
      due_date: due_date.format("YYYY-MM-DD"),
      description,
      category_id,
      payment_id: pay_id,
      cashed,
    })
    .match({ id })
    .select(getQuery);
  if (error) {
    throw error;
  }
  return data;
};

const updateTransactionCashedStatus = async ({ id, cashed, payed_amount }: TransactionUpdateStatusProps) => {
  const { data, error } = await supabase
    .from("transactions")
    .update({
      cashed: cashed,
      payed_amount: payed_amount,
      payment_date: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const removeTransaction = async (id: number) => {
  const { data, error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) {
    throw error;
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

const managePaymentRecord = async (
  cashed: boolean,
  payment_date: dayjs.Dayjs | null,
  payed_amount: number | null,
  payment_method_id: number | null,
) => {
  let pay_id = null;
  if (cashed) {
    const { data, error } = await supabase
      .from("payments")
      .insert({
        date: payment_date ? payment_date.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
        amount: payed_amount ?? 0,
        payment_method_id: payment_method_id ? payment_method_id : 1,
      })
      .select("id");

    if (error) {
      throw error;
    }
    pay_id = data[0].id;
  } else {
    if (payment_method_id) {
      const { data, error } = await supabase.from("payments").delete().eq("id", payment_method_id);
      if (error) {
        throw error;
      }
    }
  }
  return pay_id;
};

export {
  getTransactions,
  getTransactionsByCategory,
  addTransaction,
  addReccuringTransaction,
  editTransaction,
  updateTransactionCashedStatus,
  removeTransaction,
  getSumIncomeTransactions,
};
