import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DisplaySettingsRoundedIcon from '@mui/icons-material/DisplaySettingsRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { Collapse, Typography } from "@mui/material";
import { IDashboardLayoutProps } from "@/types/interfaces";
import { neutral } from "@/theme/colors";
import Stack from "@mui/material/Stack";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: neutral[900],
    border: "none",
    color: neutral[100],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiToolbar-root": {
      backgroundColor: neutral[900],
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
        width: theme.spacing(7),
      },
    }),
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    backgroundColor: "none",
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.light,
    },
  },
  padding: 0,
}));

export default function Sidebar({ open, toggleDrawer }: IDashboardLayoutProps) {
  const [expandFinanceMenu, setExpandFinanceMenu] = React.useState(false);

  const handleFinanceMenuClick = () => {
    setExpandFinanceMenu(!expandFinanceMenu);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {open || (
          <IconBox sx={{width: "100%"}}>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{marginLeft: "-16px"}}>
              <MenuIcon />
            </IconButton>
          </IconBox>
        )}
        {open && (
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: "100%"}}>
            <Typography variant="h5" noWrap component="div">
              HB
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>

      <List component="nav">
        <ListItemButton LinkComponent="a" href="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton LinkComponent="nav" onClick={handleFinanceMenuClick}>
          <ListItemIcon>
            <PaidRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Financeiro" />
          {expandFinanceMenu ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
        </ListItemButton>
        <Collapse in={expandFinanceMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ml: 4}}>
            <ListItemButton LinkComponent="a" href="/dashboard/transactions">
              <ListItemIcon>
                <ReceiptLongRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Transações por dia" />
            </ListItemButton>
            <ListItemButton LinkComponent="a" href="/dashboard/transactions/overdue">
              <ListItemIcon>
                <ReceiptLongRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Contas vencidas" />
            </ListItemButton>
          </List>
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
