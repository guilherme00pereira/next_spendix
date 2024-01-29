import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {TransactionDAO} from "@/types/entities";
import {TransactionForm} from "@/types/entities";
import {Dispatch, SetStateAction} from "react";

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
    transactions: TransactionDAO[],
    open: boolean
}

interface PageContextData {
    showModal: boolean;
    actionShowModal: (action: boolean) => void;
    mediaQuery: string;
}

interface TransactionContextData {
    balanceTotal: number[];
    transaction: TransactionForm;
    setTransaction: Dispatch<SetStateAction<TransactionForm>>;
}

export type {
    DeleteConfirmDialogProps,
    RemovableEntity,
    SinglePageParams,
    SinglePageTableProps,
    DashboardLayoutProps,
    TransactionRowDataProps,
    PageContextData,
    TransactionContextData
}

