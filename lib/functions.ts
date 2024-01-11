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
        if(groups.has(t.date)) {
            groups.get(t.date)?.push(t);
        }
        else {
            groups.set(t.date, [t]);
        }
    });
    return groups;
}

const categoryTypeColor = (type: CategoryType) => {
    switch (type) {
        case "Receita":
            return "success.main";
        case "Despesa Fixa":
            return "secondary.main";
        default:
            return "warning.main";
    }
}

export {
    amountFormatter,
    getFisrtDayOfMonth,
    getLasDayOfMonth,
    groupTransactionsByDate,
    categoryTypeColor
}