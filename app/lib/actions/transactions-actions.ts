"use server";
import { createClientServerSide } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { TransactionFormData } from "@/types/entities";

const supabase = createClientServerSide();

export async function submitTransactionForm(data: object): Promise<void> {
  const values = data as TransactionFormData;
  if (values.id) {
    editTransaction(values);
  } else {
    addTransaction(values);
  }
  revalidatePath("/dashboard/transactions");
}

const addTransaction = async ({
  amount,
  due_date,
  description,
  category_id,
  payment_date,
  payed_amount,
  payment_method_id,
  payment_id,
  in_installments,
  installments,
  draft,
  cashed,
  tags,
}: TransactionFormData) => {

  

  let pay_id = null;
  if (cashed) {
    pay_id = await managePaymentRecord(payment_date, payed_amount, payment_id, payment_method_id);
  }
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      amount,
      due_date,
      description,
      category_id,
      payment_id: pay_id,
      draft,
    })
    .select("id");

  if (error) {
    throw error;
  } else {
    if (data.length > 0) {
      const tid = data[0].id;

      if (in_installments) {
        const { error } = await supabase.from("transaction_installments").insert({ transaction_id: tid, installments });
        if (error) {
          //throw error;
        }
      }

      if (tags && tags.length > 0) {
        const rows = tags.map((tag) => ({ transaction_id: tid, tag_id: tag.id }));
        const { error } = await supabase.from("tags_transactions").insert(rows);
        if (error) {
          //throw error;
        }
      }
    }
    return data;
  }
};


const editTransaction = async ({
  id,
  amount,
  due_date,
  description,
  category_id,
  payment_date,
  payed_amount,
  payment_method_id,
  payment_id,
  draft,
  cashed,
  tags,
}: TransactionFormData) => {

  let pay_id = null;
  if (cashed) {
    pay_id = await managePaymentRecord(payment_date, payed_amount, payment_id, payment_method_id);
  }
  const { data, error } = await supabase
    .from("transactions")
    .update({
      amount,
      due_date,
      description,
      category_id,
      payment_id: pay_id,
      draft,
    })
    .match({ id })
    .select("id");
  if (error) {
    throw error;
  } else {
    if (data.length > 0) {
      const tid = data[0].id;
      if (tags && tags.length > 0) {
        const rows = tags.map((tag) => ({ transaction_id: tid, tag_id: tag.id }));
        const { error } = await supabase.from("tags_transactions").insert(rows);
        if (error) {
          //throw error;
        }
      }
    }
    return data;
  }
};

const managePaymentRecord = async (payment_date: string, payed_amount: number | null, payment_id: number | null, payment_method_id: number) => {
  
  let pay_id = null;
  if (payment_id) {
    const { data, error } = await supabase
      .from("payments")
      .update({
        date: payment_date,
        amount: payed_amount ?? 0,
        payment_method_id: payment_method_id ? payment_method_id : 1,
      })
      .eq("id", payment_id)
      .select("id");
    if (error) {
      throw error;
    }
    pay_id = data[0].id;
  } else {
    const { data, error } = await supabase
      .from("payments")
      .insert({
        date: payment_date,
        amount: payed_amount ?? 0,
        payment_method_id: payment_method_id ? payment_method_id : 1,
      })
      .select("id");
    if (error) {
      throw error;
    }
    pay_id = data[0].id;
  }
  return pay_id;
};