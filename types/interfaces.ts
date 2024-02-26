import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {CategoryFormData, CategoryType, TransactionType} from "@/types/entities";
import {TransactionFormData} from "@/types/entities";
import {Dispatch, SetStateAction} from "react";

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
    type: string
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
    showCategoryDialog: boolean;
    actionShowCategoryDialog: (action: boolean) => void;
    category: CategoryFormData;
    setCategory: (c: CategoryFormData) => void;
}

interface ICategoryTableProps {
    handleCategory: Dispatch<SetStateAction<number>>;
    categories: CategoryType[];
    isLoading: boolean;
}

interface IChildrenCategoriesProps {
    subcategories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    handleView: (id: number) => void;
}

interface ICategoryTransactionsPanelProps {
    id: number;
    action: Dispatch<SetStateAction<number>>;
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
    ICategoryTransactionsPanelProps
}

