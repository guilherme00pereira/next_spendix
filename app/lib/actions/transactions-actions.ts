"use server";
import { revalidatePath } from "next/cache";
import { editTransaction, addTransaction } from "../supabase/methods/transactions";

export async function submitIncomeForm(values: any): Promise<void> {
  if (values.id) {
    editTransaction(values);
  } else {
    addTransaction(values);
  }
  revalidatePath("/dashboard/transactions");
}
