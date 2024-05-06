import * as React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DisplaySettingsRoundedIcon from "@mui/icons-material/DisplaySettingsRounded";
import InterestsRoundedIcon from "@mui/icons-material/InterestsRounded";
import WalletIcon from "@mui/icons-material/Wallet";
import { IDashboardLayoutProps } from "@/types/interfaces";
import { neutral } from "@/theme/colors";
import { Tooltip } from "@mui/material";

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

export default function Sidebar({ open }: IDashboardLayoutProps) {
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
            <Tooltip title="Dashboard" placement="right" arrow>
              <DashboardIcon />
            </Tooltip>
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

        <ListItemButton LinkComponent="a" href="/dashboard/groups">
          <ListItemIcon>
            <InterestsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Grupo" />
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

        <ListItemButton LinkComponent="a" href="/dashboard/tags">
          <ListItemIcon>
            <LocalOfferRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItemButton>

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
