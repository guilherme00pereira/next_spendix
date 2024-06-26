import {
    CategoryFormData,
    CategoryType,
    RecurringFormData,
    TransactionType,
    TransactionFormData,
    BankAccountType,
    GroupType,
    TagType,
    CategoryWithStatsType
} from "@/types/entities";
import React, {Dispatch, SetStateAction} from "react";
import { ChartBarType } from "@/types/chart-types";

export interface ISelectOption {
    value: string;
    label: string;
}

export interface IDashboardLayoutProps {
    open: boolean;
    toggleDrawer?: (action: boolean) => void;
}

export interface IDeleteConfirmDialogProps {
    entity: IRemovableEntity;
    open: boolean;
    handleClose: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => void;
}

export interface IRemovableEntity {
    id: number, 
    name: string, 
    type: string,
}

export interface IRemovableTransaction extends IRemovableEntity {
    payment_id: number | null;
    amount: number;
}

export interface IDeleteTransactionData {
    id: number;
    payment_id: number | null;
}

export interface ITransactionRowDataProps {
    day: string,
    transactions: TransactionType[],
    open: boolean,
}

export interface IAppPersistData {
    openSidebar: boolean;
    setOpenSidebar: (action: boolean) => void;
}

export interface ISpeedDialStoreData {
    showTransactionDialog: boolean;
    actionShowTransactionDialog: (action: boolean) => void;
    transaction: TransactionFormData;
    setTransaction: (t: TransactionFormData) => void;
    showIncomeDialog: boolean;
    actionShowIncomeDialog: (action: boolean) => void;
    income: TransactionFormData;
    setIncome: (i: TransactionFormData) => void;
    showCategoryDialog: boolean;
    actionShowCategoryDialog: (action: boolean) => void;
    category: CategoryFormData;
    setCategory: (c: CategoryFormData) => void;
    showRecurringDialog: boolean;
    actionShowRecurringDialog: (action: boolean) => void;
    recurring: RecurringFormData;
    setRecurring: (r: RecurringFormData) => void;
}

export interface ISpeedDiaDialogsData {
    categories: CategoryType[], 
    tags: TagType[],
    paymentMethods: ISelectOption[],
}

export interface ICategoryListProps {
    categories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
}

export interface IGroupListItemProps {
    group: GroupType;
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    handleOpenChart: (id: number) => void;
}

export interface IAccountListItemProps {
    account: BankAccountType;
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;

}

export interface IChildrenCategoriesProps {
    subcategories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    handleView: (id: number) => void;
}

export interface ICategoriesPanelProps {
    id: number;
    action: Dispatch<SetStateAction<number>>;
}

export interface IDashboardTopCardProps {
    children: React.ReactNode;
    title: string;
    bottomValue: string;
    loading?: boolean;
}

export interface IPaperHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export interface IPaperHeaderLinkType {
    text: string;
    target: string;
}

export interface IPaperHeaderBadgeType {
    content: number;
    color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export interface IPaperHeaderSettingsType {
    buttonAction: () => void;
}

export interface ApexDailyTransactionsChartProps {
    incomeData: ChartBarType[];
    spendingsData: ChartBarType[];
  }