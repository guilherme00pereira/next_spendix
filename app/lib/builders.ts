import { getAllPaymentMethods } from "@/app/lib/supabase/methods/payment-methods";

export const convertPaymentMethodsToSelect = (payment_methods: any) => {
    return payment_methods.map((pm: any) => {
      if (pm.credit_cards) {
        return {
          value: pm.id,
          label: pm.credit_cards.name + " | Credit Card",
        };
      }
      if (pm.accounts) {
        return {
          value: pm.id,
          label: pm.accounts.bank,
        };
      }
    });
  };

export const buildSelectPaymentMethods = async () => {
    const res = await getAllPaymentMethods();
    return convertPaymentMethodsToSelect(res);
  };