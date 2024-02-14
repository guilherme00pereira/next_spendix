import { Dayjs } from "dayjs";

type CategoryType = {
    id: number;
    name: string;
    parent?: number;
    type: "Receita" | "Despesa";
    color: string | null;
    icon: string | null;
}

type PaymentType = {
    id: number;
    created_at: Dayjs;
    amount: number;
    method: string;
}

type CategoryFormData = {
    id?: number;
    name: string;
    parent?: number;
    color: string | null;
    icon: string | null;
    type: "Receita" | "Despesa";
}

type TransactionType = {
    id: number;
    due_date: string;
    description: string;
    amount: number;
    categories: CategoryType | null;
    cashed: boolean;
    payment_date: string | null;
    payed_amount: number | null;
    payment_method: number;
}

type TransactionFormData = {
    id?: number,
    amount: number,
    due_date: Dayjs,
    description: string,
    cashed: boolean,
    category_id: number,
    payment_date: Dayjs | null,
    payed_amount: number | null,
    payment_method: number;
    times: number,
    recurring: boolean,
}

type TransactionRow = {
    day: string;
    income: number;
    expense: number;
    balance: number;
}

type TransactionUpdateStatusProps = {
    id: number;
    cashed: boolean;
    payment_date: Dayjs;
    payed_amount: number;

}


export type {
    CategoryType,
    CategoryFormData,
    TransactionType,
    TransactionFormData,
    TransactionRow,
    TransactionUpdateStatusProps,
}