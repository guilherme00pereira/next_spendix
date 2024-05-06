import {
    CategoryFormData,
    CategoryType,
    RecurringFormData,
    TransactionType,
    TransactionFormData,
    PaperHeaderLinkType,
    PaperHeaderSettingsType,
    PaperHeaderBadgeType,
    PaperHeaderFilterType, BankAccountType,
    GroupFormData,
    GroupType
} from "@/types/entities";
import React, {Dispatch, SetStateAction} from "react";

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

export interface IDeleteTransactionData {
    id: number;
    payment_id: number | null;
}

export interface ITransactionRowDataProps {
    day: string,
    transactions: TransactionType[],
    open: boolean,
}

export interface IPageContextData {
    showModal: boolean;
    actionShowModal: (action: boolean) => void;
    mediaQuery: string;
}

export interface ITransactionContextData {
    selectedTransaction: TransactionType;
    setSelectedTransaction: Dispatch<SetStateAction<TransactionType>>;
    showTransactionDetail: boolean;
    actionShowTransactionDetail: (action: boolean) => void;
}

export interface ITransactionsPerDayContextData {
    selectedDay: string;
    setSelectedDay: Dispatch<SetStateAction<string>>;
    dailyTransactions: TransactionType[];
    setDailyTransactions: Dispatch<SetStateAction<TransactionType[]>>;
}

export interface ICateroryContextData {
    removableCategory: IRemovableEntity;
    setRemovableCategory: Dispatch<SetStateAction<IRemovableEntity>>;
    openConfirm: boolean;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
}

export interface IGroupContextData {
    selectedGroup: GroupType;
    setSelectedGroup: Dispatch<SetStateAction<GroupType>>;
}

export interface IAppPersistData {
    date: string;
    setDate: (d: string) => void;
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
    showGroupDialog: boolean;
    actionShowGroupDialog: (action: boolean) => void;
    group: GroupFormData;
    setGroup: (g: GroupFormData) => void;
}

export interface ICategoryListProps {
    categories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
}

export interface ICategoryListItemProps {
    category: CategoryType;
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    isSubCategory?: boolean;
}

export interface IGroupListItemProps {
    group: GroupType;
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
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

export interface IEditableObjectContextData<T> {
    editableObject: T;
    setEditableObject: Dispatch<SetStateAction<T>>;
}

export interface IDashboardTopCardProps {
    children: React.ReactNode;
    title: string;
    bottomValue: string;
    loading?: boolean;
}

export interface IPageContainerProps {
    title: string;
    children: React.ReactNode;
    hideBreadcrumb?: boolean;
}

export interface IPaperHeaderProps {
    title: string;
    link?: PaperHeaderLinkType;
    settings?: PaperHeaderSettingsType
    badge?: PaperHeaderBadgeType;
    filter?: PaperHeaderFilterType;
}