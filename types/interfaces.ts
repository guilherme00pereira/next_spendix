import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {CategoryFormData, CategoryType, TransactionType} from "@/types/entities";
import {TransactionFormData} from "@/types/entities";
import {Dispatch, SetStateAction} from "react";
import { Dayjs } from 'dayjs';

interface SelectOption {
    value: string;
    label: string;
}

interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}

interface SinglePageParams {
    params: {id: number};
}

interface SinglePageTableProps {
    id: number;
    handleName: Dispatch<SetStateAction<string>>;
    handleType: Dispatch<SetStateAction<string>>;
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
}

export type {
    SelectOption,
    DeleteConfirmDialogProps,
    RemovableEntity,
    SinglePageParams,
    SinglePageTableProps,
    DashboardLayoutProps,
    TransactionRowDataProps,
    PageContextData,
    TransactionContextData,
    AppStoreData,
    SpeedDialStoreData,
    ChildrenCategoriesProps
}

