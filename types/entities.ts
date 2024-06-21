import { Dayjs } from "dayjs";

export type CategoryType = {
    id: number;
    name: string;
    slug: string;
    type: "Receita" | "Despesa" | "Transacao";
    color: string | null;
    icon: string | null;
    groups: GroupType[] | null;
}

export type CategoryWithStatsType = Omit<CategoryType, 'groups'> & {
    current_balance: number | null;
    previous_balance: number | null;
    active: string | null
}

export type PaymentType = {
    id: number;
    date: string;
    amount: number;
    method: string;
    times: number;
}

export type TagType = {
    id: number;
    name: string;
}

export type SettingsType = {
    id: number;
    meta_key: string;
    meta_value: string;
}

export type GroupType = {
    id: number;
    name: string;
    color: string | null;
    icon: string | null;
}

export type TransactionInstallmentsType = {
    id: number;
    transaction_id: number;
    installments: number;
}

export type CategoryFormData = {
    id?: number;
    name: string;
    slug: string;
    color: string | null;
    icon: string | null;
    type: "Receita" | "Despesa" | "Transacao";
}

export type TransactionType = {
    id: number;
    due_date: string;
    description: string;
    amount: number;
    categories: CategoryType | null;
    installments: TransactionInstallmentsType[] | null;
    payments: PaymentType | null;
    draft: boolean;
    tags: TagType[] | null;
}

export type TransactionFormData = {
    id?: number,
    amount: number,
    due_date: string,
    description: string,
    cashed: boolean,
    category_id: number,
    payment_date: string,
    payed_amount: number,
    payment_method_id: number,
    payment_id: number | null,
    in_installments: boolean,
    installments: number,
    draft: boolean;
    tags_ids: number[];
}

export type RecurringFormData = {
    id?: number,
    amount: number,
    due_date: Dayjs,
    description: string,
    category_id: number,
    recurring: boolean,
    recurring_times: number,
}

export type TransactionRowType = {
    day: string;
    income: number;
    expense: number;
    balance: number;
}

export type TransactionUpdateStatusProps = {
    id: number;
    cashed: boolean;
    payment_date: Dayjs;
    payed_amount: number;
}

export type BankAccountType = {
    id: number;
    bank: string;
    balance: number;
    color: string | "000"; 
}

export type CreditCardType = {
    id: number;
    name: string;
    limit: number;
    closing_day: number;
    due_day: number;
    color?: string | null;
    final_numbers: string | null;
    brand: string | null;
    credit_cards_invoices: CreditCardInvoiceType[] | null;
}
export type CreditCardInvoiceType = {
    id: number;
    date: string;
    amount: number;
}

export type TransferMoneyFormData = {
    outcomeId: number;
    outcomeType: string;
    incomeId: number;
    incomeType: string;
    amount: number;
}