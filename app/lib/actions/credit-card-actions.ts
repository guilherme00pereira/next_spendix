"use server";
import { revalidatePath } from "next/cache";
import { updateCreditCard, addCreditCard, updateInvoiceAmount, addCreditCardInvoice } from "@/app/lib/supabase/methods/credit-cards";

export async function submitCardForm(values: any): Promise<void> {
  if (values.id) {
    updateCreditCard(values);
  } else {
    addCreditCard(values);
  }
  revalidatePath("/dashboard/credit-cards");
}

export async function submitNewInvoiceData(values: any): Promise<void> {
  addCreditCardInvoice(values.credit_card_id, values.date, values.amount);
  revalidatePath("/dashboard/credit-cards");  
}

export async function submitUpdateInvoiceAmount(id: number, amount: number): Promise<void> {
  updateInvoiceAmount(id, amount);
  revalidatePath("/dashboard/credit-cards");  
}