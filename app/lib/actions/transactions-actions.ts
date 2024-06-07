"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { TransactionFormData } from "@/types/entities";
import { addTransaction, editTransaction } from "@/app/lib/supabase/methods/transactions";

export async function submitTransactionForm(data: object): Promise<void> {
  const values = data as TransactionFormData;
  if (values.id) {
    await editTransaction(values);
    revalidateTransactions();
  } else {
    await addTransaction(values);
    revalidateTransactions();
  }
}

export const revalidateTransactions = () => {
  revalidateTag("get_transactions");
  revalidateTag("get_payed_transactions");
  revalidateTag("get_future_transactions");
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard/transactions/all");
  revalidatePath("/dashboard/transactions/overdue");
};
