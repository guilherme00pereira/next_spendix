import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface DashboardLayoutProps extends MuiAppBarProps {
    open?: boolean;
    toggleDrawer?: () => void;
}

export enum CategoryTypes {
    'Receita' = 1,
    'Despesa Fixa' = 2,
    'Despesa Variável' = 3,
}
