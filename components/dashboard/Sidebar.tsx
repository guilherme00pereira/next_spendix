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
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Typography } from "@mui/material";
import { DashboardLayoutProps } from "@/types/interfaces";
import { neutral } from "@/theme/colors";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: neutral[800],
    border: 'none',
    color: neutral[100],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '& .MuiToolbar-root': {
      backgroundColor: theme.palette.primary.main,
      color: "#FFF",
      '& .MuiIconButton-root': {
        color: "#FFF",
      },
    },
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
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
            <ReceiptLongRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Transações" />
        </ListItemButton>

        <ListItemButton LinkComponent="a" href="/dashboard/categories">
          <ListItemIcon>
            <ListAltRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Categorias" />
        </ListItemButton>

        <ListItemButton LinkComponent="a" href="/dashboard/tags">
            <ListItemIcon>
                <LocalOfferRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
        </ListItemButton>

        <ListItemButton LinkComponent="a" href="/dashboard/bank-accounts">
          <ListItemIcon>
            <AccountBalanceRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Contas" />
        </ListItemButton>

        <ListItemButton LinkComponent="a" href="/dashboard/credit-cards">
            <ListItemIcon>
                <CreditCardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Cartões de Crédito" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
