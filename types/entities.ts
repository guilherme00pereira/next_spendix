import { Dayjs } from "dayjs";

type CategoryType = {
    id: number;
    name: string;
    slug: string;
    parent: number | null;
    type: "Receita" | "Despesa" | "Transacao";
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

type TagType = {
    id: number;
    name: string;
}

type TransactionInstallmentsType = {
    id: number;
    transaction_id: number;
    installments: number;
}

type CategoryFormData = {
    id?: number;
    name: string;
    slug: string;
    parent: number | null;
    color: string | null;
    icon: string | null;
    type: "Receita" | "Despesa" | "Transacao";
}

type TransactionType = {
    id: number;
    due_date: string;
    description: string;
    amount: number;
    categories: CategoryType | null;
    installments: TransactionInstallmentsType[] | null;
    payments: PaymentType | null;
    draft: boolean;
    tags: TagType[];
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
    payment_method_id: number,
    payment_id: number | null,
    in_installments: boolean,
    installments: number,
    draft: boolean;
    tags: TagType[];
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

type BankAccountType = {
    id?: number;
    bank: string;
    balance: number;
    color: string | "000"; 
}

type CreditCardType = {
    id?: number;
    name: string;
    limit: number;
    closing_day: number;
    due_day: number;
    current_balance: number;
    current_invoice: number;
    color: string | "000";
}

type TransferMoneyFormData = {
    outcomeId: number;
    outcomeType: string;
    incomeId: number;
    incomeType: string;
    amount: number;
}


export type {
    CategoryType,
    PaymentType,
    TagType,
    CategoryFormData,
    TransactionType,
    TransactionFormData,
    RecurringFormData,
    TransactionRow,
    TransactionUpdateStatusProps,
    ChartBarType,
    BankAccountType,
    CreditCardType,
    TransferMoneyFormData
}