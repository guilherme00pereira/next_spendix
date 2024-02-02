import {TransactionType, PaymentOptionType} from "@/types/entities";

const amountFormatter = (v: number) => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    }).format(v);
}

const getFisrtDayOfMonth = (m: number, y: number) => {
    if(m === 0 && y === 0) {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().substring(0, 10);
        
    } else {
        return new Date(y, m, 1).toISOString().substring(0, 10);
    }
}

const getLasDayOfMonth = (m: number, y: number) => {
    if(m === 0 && y === 0) {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth()+1, 0).toISOString().substring(0, 10);
        
    } else {
        return new Date(y, m+1, 0).toISOString().substring(0, 10);
    }
    
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

const categoryTypeColor = (type: "Receita" | "Despesa") => {
    switch (type) {
        case "Receita":
            return "success.main";
        default:
            return "secondary.main";
    }
}

const transactionConverterResponseToType = (
  {id, amount, due_date, description, cashed, payment_date, payed_amount, categories, payment_options} :
  {
      id: number,
      amount: number,
      due_date: string,
      description: string | null,
      cashed: boolean,
      payment_date: string | null,
      payed_amount: number | null,
      categories: {id: number, name: string, type: "Receita" | "Despesa"} | null,
      payment_options: {id: number, name: string, due_date: number | null, next_best_day: number | null} | null
  }
): TransactionType => {
    let po: PaymentOptionType = {
        id: payment_options ? payment_options.id : 0,
        name: "",
        due_date: null,
        next_best_day: null
    };

    return {
        id,
        amount,
        due_date,
        description: description || "",
        cashed,
        payment_date: payment_date || null,
        payed_amount: payed_amount || null,
        categories,
        payment_options: po
    }
}

export {
    amountFormatter,
    getFisrtDayOfMonth,
    getLasDayOfMonth,
    groupTransactionsByDate,
    categoryTypeColor,
    transactionConverterResponseToType
}