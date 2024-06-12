import { createClient } from "@/app/lib/supabase/client";
import { CreditCardType } from "@/types/entities";

const supabase = createClient();

export const getCreditCards = async () => {
  const { data, error } = await supabase.from("credit_cards").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getCreditCardsInvoices = async (id?: number) => {
  if (id) {
    const { data, error } = await supabase
      .from("credit_cards_invoices")
      .select("*, credit_cards(*)")
      .eq("credit_card_id", id);
    if (error) {
      throw error;
    }
    return data;
  }
  const { data, error } = await supabase.from("credit_cards_invoices").select("*, credit_cards(*)");
  if (error) {
    throw error;
  }
  return data;
};

export const addCreditCard = async ({ name, limit, closing_day, due_day, color, final_numbers }: CreditCardType) => {
  const { data, error } = await supabase.from("credit_cards").insert({ name, limit, closing_day, due_day, color, final_numbers });
  if (error) {
    throw error;
  }
  return data;
};

export const updateCreditCard = async ({ id, name, limit, closing_day, due_day, color, final_numbers }: CreditCardType) => {
  const { data, error } = await supabase
    .from("credit_cards")
    .update({ name, limit, closing_day, due_day, color, final_numbers })
    .match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export const removeCreditCard = async (id: number) => {
  const { data, error } = await supabase.from("credit_cards").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export const addCreditCardInvoice = async (credit_card_id: number, date: string, amount: number) => {
  const { data, error } = await supabase.from("credit_cards_invoices").insert({ credit_card_id, date, amount });
  if (error) {
    throw error;
  }
  return data;
}

export const updateInvoiceAmount = async (id: number, amount: number) => {
  const { data, error } = await supabase.from("credit_cards_invoices").update({ amount }).match({ id });
  if (error) {
    throw error;
  }
  return data;
};