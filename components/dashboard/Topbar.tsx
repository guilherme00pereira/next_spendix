import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DashboardLayoutProps } from '@/types/dashboard';
import {Typography} from "@mui/material";

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<DashboardLayoutProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Topbar = ({props}: {props: DashboardLayoutProps}) => {
    return (
        <AppBar position="absolute" open={props.open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props. toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(props.open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {!props.open && (
                       <Typography
                            variant="h5"
                            color="inherit"
                            noWrap
                        >
                            Spendix
                        </Typography>
                            )}

                    </Toolbar>
                </AppBar>
    );
};

export default Topbar;