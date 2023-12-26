import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}
