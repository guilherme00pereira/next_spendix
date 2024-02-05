import { Dayjs } from "dayjs";

type CategoryType = {
    id: number;
    name: string;
    type: "Receita" | "Despesa";
}

type CategoryFormData = {
    id?: number;
    name: string;
    type: "Receita" | "Despesa";
}

type PaymentOptionType = {
    id: number;
    name: string;
    due_date: Dayjs | null;
    next_best_day: Dayjs | null;
}

type TransactionType = {
    id: number;
    due_date: string;
    description: string;
    amount: number;
    categories: CategoryType;
    cashed: boolean;
    payment_date: string | null;
    payed_amount: number | null;
    payment_options: PaymentOptionType;
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
    payment_option_id: number,
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
    PaymentOptionType
}