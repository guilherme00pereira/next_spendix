import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    BankAccountFormData,
    CategoryFormData,
    CategoryType,
    CreditCardFormData,
    RecurringFormData,
    TransactionType,
    TransferMoneyFormData,
    TransactionFormData
} from "@/types/entities";
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
    showTransferDialog: boolean;
    actionShowTransferDialog: (action: boolean) => void;
    transfer: TransferMoneyFormData;
    setTransfer: (t: TransferMoneyFormData) => void;
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

interface IBankAccountContextData {
    editableAccount: BankAccountFormData;
    setEditableAccount: Dispatch<SetStateAction<BankAccountFormData>>;
}

interface ICreditCardContextData {
    editableCard: CreditCardFormData;
    setEditableCard: Dispatch<SetStateAction<CreditCardFormData>>;
}

interface IDashboardTopCardProps {
    children: React.ReactNode;
    title: string;
    bottomValue: string;
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
    IBankAccountContextData,
    ICreditCardContextData,
    IDashboardTopCardProps
}

