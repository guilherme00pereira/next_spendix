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

type PaymentOptionDAO = {
    id: number;
    name: string;
    due_date: Dayjs | null;
    next_best_day: Dayjs | null;
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
    payment_options: PaymentOptionDAO;
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
    CategoryDAO,
    CategoryType,
    CategoryForm,
    GroupDAO,
    TransactionDAO,
    TransactionForm,
    TransactionRow,
    TransactionUpdateStatusProps,
}