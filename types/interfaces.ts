import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {TransactionDAO} from "@/types/entities";

interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}

interface AddNewCardProps {
    toggle: boolean;
    action: (showAdd: boolean) => void;
    dispatchTableUpdate: (action: any) => void;
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
    AddNewCardProps,
    DashboardLayoutProps,
    TransactionRowDataProps,
    PageContextData
}

