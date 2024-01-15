import { Dayjs } from "dayjs";

type CategoryDAO = {
    id: number;
    name: string;
    type: CategoryType;
}

type CategoryType = "Receita" | "Despesa Fixa" | "Despesa Variável" | null;

type CategoryForm = {
    id?: number;
    name: string;
    type: CategoryType;
}

type GroupDAO = {
    id: number;
    name: string;
}

type TransactionDAO = {
    id: number;
    due_date: string;
    description: string;
    amount: number;
    categories: CategoryDAO;
    cashed: boolean;
    payment_date: string | null;
    payed_amount: number | null;
}

type TransactionForm = {
    id?: number,
    amount: number,
    due_date: Dayjs,
    description: string,
    cashed: boolean,
    category_id: number,
    payment_date: Dayjs | null,
    payed_amount: number | null,
    times: number,
    recurring: boolean,
}

type TransactionRow = {
    day: string;
    income: number;
    expense: number;
    balance: number;
}

export type {
    CategoryDAO,
    CategoryType,
    CategoryForm,
    GroupDAO,
    TransactionDAO,
    TransactionForm,
    TransactionRow
}