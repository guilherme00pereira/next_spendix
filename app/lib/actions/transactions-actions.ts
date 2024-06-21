"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { TransactionFormData } from "@/types/entities";
import { addTransaction, editTransaction, removeTransaction } from "@/app/lib/supabase/methods/transactions";

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

export async function deleteTransaction(id: number, payment_id: number | null): Promise<void> {
  await removeTransaction({id, payment_id});
  revalidateTransactions();
}

export const revalidateTransactions = () => {
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard/transactions/all");
  revalidatePath("/dashboard/transactions/overdue");
};
