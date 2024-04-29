'use server'
import { editBankAccount, addBankAccount } from "@/lib/supabase/methods/bank-accounts";
import { revalidatePath } from "next/cache";

export async function formSubmit(values: any): Promise<void> {
    if (values.id) {
      editBankAccount(values);
    } else {
      addBankAccount(values);
    }
    revalidatePath("/dashboard/bank-accounts");
  }