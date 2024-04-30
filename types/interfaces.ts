import {
    CategoryFormData,
    CategoryType,
    RecurringFormData,
    TransactionType,
    TransactionFormData,
    PaperHeaderLinkType,
    PaperHeaderSettingsType,
    PaperHeaderBadgeType,
    PaperHeaderFilterType, BankAccountType
} from "@/types/entities";
import React, {Dispatch, SetStateAction} from "react";

interface ISelectOption {
    value: string;
    label: string;
}

interface IDashboardLayoutProps {
    open: boolean;
    toggleDrawer?: (action: boolean) => void;
}

interface IDeleteConfirmDialogProps {
    entity: IRemovableEntity;
    open: boolean;
    handleClose: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => void;
}

interface IRemovableEntity {
    id: number, 
    name: string, 
    type: string,
}

interface IDeleteTransactionData {
    id: number;
    payment_id: number | null;
}

interface ITransactionRowDataProps {
    day: string,
    transactions: TransactionType[],
    open: boolean,
}

interface IPageContextData {
    showModal: boolean;
    actionShowModal: (action: boolean) => void;
    mediaQuery: string;
}

interface ITransactionContextData {
    selectedTransaction: TransactionType;
    setSelectedTransaction: Dispatch<SetStateAction<TransactionType>>;
    showTransactionDetail: boolean;
    actionShowTransactionDetail: (action: boolean) => void;
}

interface ITransactionsPerDayContextData {
    selectedDay: string;
    setSelectedDay: Dispatch<SetStateAction<string>>;
    dailyTransactions: TransactionType[];
    setDailyTransactions: Dispatch<SetStateAction<TransactionType[]>>;
}

interface ICateroryContextData {
    removableCategory: IRemovableEntity;
    setRemovableCategory: Dispatch<SetStateAction<IRemovableEntity>>;
    openConfirm: boolean;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
}

interface IAppPersistData {
    date: string;
    setDate: (d: string) => void;
    openSidebar: boolean;
    setOpenSidebar: (action: boolean) => void;
}

interface ISpeedDialStoreData {
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

interface ICategoryListProps {
    categories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
}

interface ICategoryListItemProps {
    category: CategoryType;
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    isSubCategory?: boolean;
}

interface IAccountListItemProps {
    account: BankAccountType;
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;

}

interface IChildrenCategoriesProps {
    subcategories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    handleView: (id: number) => void;
}

interface ICategoriesPanelProps {
    id: number;
    action: Dispatch<SetStateAction<number>>;
}

interface IEditableObjectContextData<T> {
    editableObject: T;
    setEditableObject: Dispatch<SetStateAction<T>>;
}

interface IDashboardTopCardProps {
    children: React.ReactNode;
    title: string;
    bottomValue: string;
    loading?: boolean;
}

interface IPageContainerProps {
    title: string;
    children: React.ReactNode;
    hideBreadcrumb?: boolean;
}

interface IPaperHeaderProps {
    title: string;
    link?: PaperHeaderLinkType;
    settings?: PaperHeaderSettingsType
    badge?: PaperHeaderBadgeType;
    filter?: PaperHeaderFilterType;
}

export type {
    ISelectOption,
    IDeleteConfirmDialogProps,
    IRemovableEntity,
    IDashboardLayoutProps,
    ITransactionRowDataProps,
    IPageContextData,
    ITransactionContextData,
    ITransactionsPerDayContextData,
    ICateroryContextData,
    IAppPersistData,
    ISpeedDialStoreData,
    ICategoryListProps,
    ICategoryListItemProps,
    IAccountListItemProps,
    IChildrenCategoriesProps,
    ICategoriesPanelProps,
    IEditableObjectContextData,
    IDashboardTopCardProps,
    IDeleteTransactionData,
    IPageContainerProps,
    IPaperHeaderProps,
}

