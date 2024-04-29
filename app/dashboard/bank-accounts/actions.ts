"use server";
import { revalidatePath } from "next/cache";
import { editBankAccount, addBankAccount } from "@/lib/supabase/methods/bank-accounts";

export async function formSubmit(values: any): Promise<void> {
  if (values.id) {
    editBankAccount(values);
  } else {
    addBankAccount(values);
  }
  revalidatePath("/dashboard/bank-accounts");
}
