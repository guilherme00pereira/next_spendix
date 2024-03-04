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
    date: string;
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
    payment_method_id: number | null,
    in_installments: boolean,
    installments: number,
}

type RecurringFormData = {
    id?: number,
    amount: number,
    due_date: Dayjs,
    description: string,
    category_id: number,
    recurring: boolean,
    recurring_times: number,
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

type ChartBarType = {
    name: string;
    value: number;
    label: string;
}


export type {
    CategoryType,
    PaymentType,
    CategoryFormData,
    TransactionType,
    TransactionFormData,
    RecurringFormData,
    TransactionRow,
    TransactionUpdateStatusProps,
    ChartBarType
}