import {CategoryType, PaymentType, TransactionType} from "@/types/entities";

const amountFormatter = (v: number) => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    }).format(v);
}

const groupTransactionsByDate = (transactions: TransactionType[]) => {
    const groups = new Map<string, TransactionType[]>();
    transactions.forEach((t) => {
        if(t.payments?.date) {
            if (groups.has(t.payments.date)) {
                groups.get(t.payments.date)?.push(t);
            } else {
                groups.set(t.payments.date, [t]);
            }
        }
    });
    return new Map([...groups].sort());
}

const transactionConverterResponseToType = (
  {id, amount, due_date, description, cashed, payment_date, payed_amount, categories, payments} :
  {
      id: number,
      amount: number,
      due_date: string,
      description: string | null,
      cashed: boolean,
      payment_date: string | null,
      payed_amount: number | null,
      categories: CategoryType | null,
      payments: PaymentType | null,
  }
): TransactionType => {

    return {
        id,
        amount,
        due_date,
        description: description || "",
        cashed,
        categories,
        payments
    }
}

const convertPaymentMethodsToSelect = (payment_methods: any) => {
    return payment_methods.map((pm: any) => {
        if (pm.credit_cards) {
            return {
                value: pm.id,
                label: pm.credit_cards.name + " | Credit Card"
            }
        }
        if (pm.accounts) {
            return {
                value: pm.id,
                label: pm.accounts.bank
            }
        }
    })
}

export {
    amountFormatter,
    groupTransactionsByDate,
    transactionConverterResponseToType,
  convertPaymentMethodsToSelect
}