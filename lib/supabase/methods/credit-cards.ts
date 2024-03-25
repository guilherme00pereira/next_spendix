import { supabase } from "@/lib/supabase/supabase-client";
import { CreditCardType } from "@/types/entities";

const getCreditCards = async () => {
  const { data, error } = await supabase.from("credit_cards").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const addCreditCard = async ({ name, limit, closing_day, due_day, current_balance, current_invoice, color }: CreditCardType) => {
  const { data, error } = await supabase.from("credit_cards").insert({ name, limit, closing_day, due_day, current_balance, current_invoice, color });
  if (error) {
    throw error;
  }
  return data;
};

const editCreditCard = async ({ id, name, limit, closing_day, due_day, current_balance, current_invoice, color }: CreditCardType) => {
  const { data, error } = await supabase.from("credit_cards").update({ name, limit, closing_day, due_day, current_balance, current_invoice, color }).match({ id });
  if (error) {
    throw error;
  }
  return data;
};

const removeCreditCard = async (id: number) => {
  const { data, error } = await supabase.from("credit_cards").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export { getCreditCards, addCreditCard, editCreditCard, removeCreditCard };
