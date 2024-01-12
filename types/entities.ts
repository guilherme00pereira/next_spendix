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
    date: string;
    description: string;
    amount: number;
    categories: CategoryDAO;
    cashed: boolean;
}

type TransactionForm = {
    id?: number,
    amount: number,
    date: Dayjs,
    description: string,
    cashed: boolean,
    category_id: number,
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