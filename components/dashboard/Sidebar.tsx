import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import { Typography } from "@mui/material";
import { DashboardLayoutProps } from "@/types/dashboard";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.background.sidebar,
    border: 'none',
    color: theme.palette.text.sidebar,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Sidebar({ props }: { props: DashboardLayoutProps }) {
  return (
    <Drawer variant="permanent" open={props.open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          px: [1],
        }}
      >
        <Typography variant="h5" noWrap component="div">
            Spendix
        </Typography>
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      
      <List component="nav">
        <ListItemButton LinkComponent="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton LinkComponent="a" href="/dashboard/transactions">
          <ListItemIcon>
            <MonetizationOnRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Lançamentos" />
        </ListItemButton>

        <ListItemButton LinkComponent="a" href="/dashboard/categories">
          <ListItemIcon>
            <ListAltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Categorias" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
