import { unstable_cache } from "next/cache";
import { createClientServerSide } from "@/app/lib/supabase/server";
import { RecurringFormData, TransactionFormData, TransactionType } from "@/types/entities";
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

const supabase = createClientServerSide();

const getInnerPaymentsQuery = `id, amount, due_date, description, draft, categories(*), payments!inner(*), 
                  installments: transaction_installments(*), tags(*)`;
const getDefaultQuery = `id, amount, due_date, description, draft, categories(*), payments(*), installments: transaction_installments(*)`;

export const getTransactions = unstable_cache(
  async (initial_date: string, final_date: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .select(getDefaultQuery)
      .eq("draft", false)
      .gte("due_date", initial_date)
      .lte("due_date", final_date)
      .order("due_date", { ascending: true });
    if (error) {
      throw error;
    }
    return data as TransactionType[];
  },
  ["get_transactions"]
);

export const getPayedTransactions = unstable_cache(
  async (initial_date: string, final_date: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .select(getInnerPaymentsQuery)
      .eq("draft", false)
      .gte("payments.date", initial_date)
      .lte("payments.date", final_date);
    if (error) {
      throw error;
    }
    const result = data.sort((a: any, b: any) => {
      return a.payments.date.localeCompare(b.payments.date);
    });
    return result as TransactionType[];
  },
  ["get_payed_transactions"]
);

export const getFutureTransactions = unstable_cache(
  async (initial_date: string, final_date: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .select(getDefaultQuery)
      .is("payment_id", null)
      .gte("due_date", initial_date)
      .lte("due_date", final_date)
      .order("due_date", { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  },
  ["get_future_transactions"]
);

export const addTransaction = async ({
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

export const editTransaction = async ({
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

export const getTransactionsByCategory = async (di: string, df: string, category_id: number) => {
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

export const getOverdueTransactions = async () => {
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

export const addReccuringTransaction = async ({ amount, due_date, description, category_id, recurring_times }: RecurringFormData) => {
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

export const removeTransaction = async ({ id, payment_id }: IDeleteTransactionData) => {
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

export const getSumIncomeTransactions = async (di: string, df: string) => {
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

export const getTransactionsByCategoriesLastYear = async (category_id: number) => {
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

export const managePaymentRecord = async (payment_date: string, payed_amount: number | null, payment_id: number | null, payment_method_id: number) => {
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

export const managePaymentMethodUpdateBalance = async (payment_method_id: number, amount: number, type: string) => {
  if (type === "Receita") {
    //await incrementPaymentMethodBalance(payment_method_id, amount);
  } else {
    //await decrementPaymentMethodBalance(payment_method_id, amount);
  }
};
