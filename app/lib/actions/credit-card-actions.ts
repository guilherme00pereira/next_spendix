"use server";
import { revalidatePath } from "next/cache";
import { updateCreditCard, addCreditCard, updateInvoiceAmount } from "@/app/lib/supabase/methods/credit-cards";

export async function submitCardForm(values: any): Promise<void> {
  if (values.id) {
    updateCreditCard(values);
  } else {
    addCreditCard(values);
  }
  revalidatePath("/dashboard/credit-cards");
}

export async function submitUpdateInvoiceAmount(id: number, amount: number): Promise<void> {
  updateInvoiceAmount(id, amount);
  revalidatePath("/dashboard/credit-cards");  
}