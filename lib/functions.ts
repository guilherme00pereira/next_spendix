import {TransactionDAO, CategoryType} from "@/types/entities";

const amountFormatter = (v: number) => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    }).format(v);
}

const getFisrtDayOfMonth = (m?: number, y?: number) => {
    if(m && y) {
        return new Date(y, m, 1).toISOString().substring(0, 10);
    }
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().substring(0, 10);
}

const getLasDayOfMonth = (m?: number, y?: number) => {
    if(m && y) {
        return new Date(y, m+1, 0).toISOString().substring(0, 10);
    }
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth()+1, 0).toISOString().substring(0, 10);
}

const groupTransactionsByDate = (transactions: TransactionDAO[]) => {
    const groups = new Map<string, TransactionDAO[]>();
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

const categoryTypeColor = (type: CategoryType) => {
    switch (type) {
        case "Receita":
            return "success.main";
        default:
            return "secondary.main";
    }
}

export {
    amountFormatter,
    getFisrtDayOfMonth,
    getLasDayOfMonth,
    groupTransactionsByDate,
    categoryTypeColor
}