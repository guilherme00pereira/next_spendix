"use server";
import { revalidatePath } from "next/cache";
import { editCreditCard, addCreditCard } from "@/lib/supabase/methods/credit-cards";

export async function formSubmit(values: any): Promise<void> {
  if (values.id) {
    editCreditCard(values);
  } else {
    addCreditCard(values);
  }
  revalidatePath("/dashboard/credit-cards");
}
