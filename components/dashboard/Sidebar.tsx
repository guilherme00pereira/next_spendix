import * as React from "react";
import { styled } from "@mui/material/styles";
import type {} from '@mui/material/themeCssVarsAugmentation';
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Stack } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DisplaySettingsRoundedIcon from "@mui/icons-material/DisplaySettingsRounded";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { Collapse, Typography } from "@mui/material";
import { IDashboardLayoutProps } from "@/types/interfaces";
import { neutral } from "@/theme/colors";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.vars.palette.background.paper,
    [theme.getColorSchemeSelector("light")]: {
      backgroundColor: neutral[900],
    },
    border: "none",
    color: neutral[200],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiToolbar-root": {
      backgroundColor: theme.vars.palette.background.paper,
      [theme.getColorSchemeSelector("light")]: {
        backgroundColor: neutral[900],
      },
      color: "#FFF",
      "& .MuiIconButton-root": {
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
        width: "52px",
      },
    }),
  },
}));

const ParentListNode = styled(List, {
  shouldForwardProp: (prop) => prop !== "disablePadding",
})(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.paper,
  [theme.getColorSchemeSelector("light")]: {
    backgroundColor: neutral[900],
  },
}));

export default function Sidebar({ open }: IDashboardLayoutProps) {
  const [expandFinanceMenu, setExpandFinanceMenu] = React.useState(true);
  const [expandPaymentMethods, setExpandPaymentMethods] = React.useState(false);


  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "16px !important",
        }}
      >
        <Stack direction="row" spacing={1}>
        {open && (
          <>
            <WalletIcon color="primary" />
            <Typography variant="h5" color="primary">
              1WALLET
            </Typography>
          </>
        )}
        {open || <WalletIcon color="primary" />}
        </Stack>
      </Toolbar>

      <List component="nav">
        <ListItemButton LinkComponent="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton LinkComponent="nav" onClick={() => setExpandFinanceMenu(!expandFinanceMenu)}>
          <ListItemIcon>
          {expandFinanceMenu ? <ExpandLessRoundedIcon /> : <PaidRoundedIcon />}
          </ListItemIcon>
          <ListItemText primary="Financeiro" />
        </ListItemButton>
          <Collapse in={expandFinanceMenu} timeout="auto" unmountOnExit>
            <ParentListNode disablePadding>
              <ListItemButton LinkComponent="a" href="/dashboard/transactions" sx={{ml: open ? 2 : 0}}>
                <ListItemIcon>
                  <ReceiptLongRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Transações por dia" />
              </ListItemButton>
              <ListItemButton LinkComponent="a" href="/dashboard/transactions/cashflow" sx={{ml: open ? 2 : 0}}>
                <ListItemIcon>
                  <PriceChangeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Fluxo de Caixa" />
              </ListItemButton>
              <ListItemButton LinkComponent="a" href="/dashboard/transactions/overdue" sx={{ml: open ? 2 : 0}}>
                <ListItemIcon>
                  <AlarmRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Contas vencidas" />
              </ListItemButton>
            </ParentListNode>
          </Collapse>

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

        <ListItemButton LinkComponent="nav" onClick={() => setExpandPaymentMethods(!expandPaymentMethods)}>
          <ListItemIcon>
            {expandPaymentMethods ? <ExpandLessRoundedIcon /> : <AccountBalanceWalletIcon />}
          </ListItemIcon>
          <ListItemText primary="Carteira" />
        </ListItemButton>
        <Collapse in={expandPaymentMethods} timeout="auto" unmountOnExit>
          <ParentListNode disablePadding>
            <ListItemButton LinkComponent="a" href="/dashboard/bank-accounts" sx={{ml: open ? 2 : 0}}>
              <ListItemIcon>
                <AccountBalanceRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Contas" />
            </ListItemButton>
            <ListItemButton LinkComponent="a" href="/dashboard/credit-cards" sx={{ml: open ? 2 : 0}}>
              <ListItemIcon>
                <CreditCardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Cartões de Crédito" />
            </ListItemButton>
          </ParentListNode>
        </Collapse>

        <ListItemButton LinkComponent="a" href="/dashboard/settings">
          <ListItemIcon>
            <DisplaySettingsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
