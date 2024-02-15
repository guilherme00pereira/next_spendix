import { Dayjs } from "dayjs";

type CategoryType = {
    id: number;
    name: string;
    parent: number | null;
    type: "Receita" | "Despesa";
    color: string | null;
    icon: string | null;
}

type PaymentType = {
    id: number;
    date: Dayjs;
    amount: number;
    method: string;
    times: number;
}

type CategoryFormData = {
    id?: number;
    name: string;
    parent: number | null;
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
    payments: PaymentType | null;
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
    payment_id: number | null,
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
    PaymentType,
    CategoryFormData,
    TransactionType,
    TransactionFormData,
    TransactionRow,
    TransactionUpdateStatusProps,
}