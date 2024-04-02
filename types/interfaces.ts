import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    CategoryFormData,
    CategoryType,
    RecurringFormData,
    TransactionType,
    TransactionFormData
} from "@/types/entities";
import React, {Dispatch, SetStateAction} from "react";

interface ISelectOption {
    value: string;
    label: string;
}

interface IDashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
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
    payment_id: number | null
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
    balanceTotal: number[];
    list: TransactionType[];
    setList: Dispatch<SetStateAction<TransactionType[]>>;
}

interface IAppStoreData {
    date: string;
    setDate: (d: string) => void;
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

interface ICategoryTableProps {
    handleCategory: Dispatch<SetStateAction<number>>;
    categories: CategoryType[];
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
    loading: boolean;
}

export type {
    ISelectOption,
    IDeleteConfirmDialogProps,
    IRemovableEntity,
    IDashboardLayoutProps,
    ITransactionRowDataProps,
    IPageContextData,
    ITransactionContextData,
    IAppStoreData,
    ISpeedDialStoreData,
    ICategoryTableProps,
    IChildrenCategoriesProps,
    ICategoriesPanelProps,
    IEditableObjectContextData,
    IDashboardTopCardProps,
    IDeleteTransactionData
}

