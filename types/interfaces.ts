import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {CategoryFormData, CategoryType, TransactionType} from "@/types/entities";
import {TransactionFormData} from "@/types/entities";
import {Dispatch, SetStateAction} from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}

interface DeleteConfirmDialogProps {
    entity: RemovableEntity;
    open: boolean;
    handleClose: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => void;
}

interface RemovableEntity {
    id: number, 
    name: string, 
    type: string
}

interface TransactionRowDataProps {
    day: string,
    transactions: TransactionType[],
    open: boolean,
}

interface PageContextData {
    showModal: boolean;
    actionShowModal: (action: boolean) => void;
    mediaQuery: string;
}

interface TransactionContextData {
    balanceTotal: number[];
    list: TransactionType[];
    setList: Dispatch<SetStateAction<TransactionType[]>>;
}

interface AppStoreData {
    date: string;
    setDate: (d: string) => void;
}

interface SpeedDialStoreData {
    showTransactionDialog: boolean;
    actionShowTransactionDialog: (action: boolean) => void;
    transaction: TransactionFormData;
    setTransaction: (t: TransactionFormData) => void;
    showCategoryDialog: boolean;
    actionShowCategoryDialog: (action: boolean) => void;
    category: CategoryFormData;
    setCategory: (c: CategoryFormData) => void;
}

interface ChildrenCategoriesProps {
    subcategories: CategoryType[];
    handleEdit: (id: number) => void;
    handleConfirmDelete: (id: number, name: string) => void;
    handleView: (id: number) => void;
}

export type {
    SelectOption,
    DeleteConfirmDialogProps,
    RemovableEntity,
    DashboardLayoutProps,
    TransactionRowDataProps,
    PageContextData,
    TransactionContextData,
    AppStoreData,
    SpeedDialStoreData,
    ChildrenCategoriesProps
}

