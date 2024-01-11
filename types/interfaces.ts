import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {TransactionDAO} from "@/types/entities";
import {Dispatch, SetStateAction} from "react";

interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}

interface DeleteConfirmDialogProps {
    entity: {id: number, name: string, type: string};
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
    DashboardLayoutProps,
    TransactionRowDataProps,
    PageContextData
}

