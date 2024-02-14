import {CategoryType, TransactionType} from "@/types/entities";

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
        if(t.payment_date) {
            if (groups.has(t.payment_date)) {
                groups.get(t.payment_date)?.push(t);
            } else {
                groups.set(t.payment_date, [t]);
            }
        }
    });
    return new Map([...groups].sort());
}

const transactionConverterResponseToType = (
  {id, amount, due_date, description, cashed, payment_date, payed_amount, categories, payment_method} :
  {
      id: number,
      amount: number,
      due_date: string,
      description: string | null,
      cashed: boolean,
      payment_date: string | null,
      payed_amount: number | null,
      categories: CategoryType | null,
      payment_method: number,
  }
): TransactionType => {

    return {
        id,
        amount,
        due_date,
        description: description || "",
        cashed,
        payment_date: payment_date || null,
        payed_amount: payed_amount || null,
        categories,
        payment_method
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