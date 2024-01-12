import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {CategoryForm, TransactionDAO, TransactionForm} from "@/types/entities";
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
    entity: CategoryForm;
    open: boolean;
    handleClose: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => void;
}

interface TransactionRowDataProps {
    day: string,
    transactions: TransactionDAO[],
    open: boolean
}

interface PageContextData {
    showModal: boolean;
    actionShowModal: (action: boolean) => void;
}

export type {
    DeleteConfirmDialogProps,
    SinglePageParams,
    SinglePageTableProps,
    DashboardLayoutProps,
    TransactionRowDataProps,
    PageContextData
}

