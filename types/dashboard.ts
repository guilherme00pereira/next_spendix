import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}

export interface AddNewCardProps {
    toggle: boolean;
    action: (showAdd: boolean) => void;
}

