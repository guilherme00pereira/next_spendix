type CategoryDAO = {
    id: number;
    name: string;
    type: CategoryType;
}

type CategoryType = "Receita" | "Despesa Fixa" | "Despesa Variável" | null;

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

type TransactionRow = {
    day: string;
    income: number;
    expense: number;
    balance: number;
}

export type {
    CategoryDAO,
    CategoryType,
    GroupDAO,
    TransactionDAO,
    TransactionRow
}