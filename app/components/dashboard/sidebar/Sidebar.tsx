import React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import DisplaySettingsRoundedIcon from "@mui/icons-material/DisplaySettingsRounded";
import InterestsRoundedIcon from "@mui/icons-material/InterestsRounded";
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SidebarDrawer from "./SidebarDrawer";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarTitle from "./SidebarTitle";
import AddButton from "./AddButton";



export default function Sidebar() {
  
  return (
    <SidebarDrawer>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "16px !important",
        }}
      >
        <SidebarTitle />
      </Toolbar>

      <List component="nav">
        <SidebarMenuItem title="Dashboard" icon={<DashboardIcon fontSize="small" />} link="/dashboard" />
        <SidebarMenuItem title="Transações" icon={<AttachMoneyRoundedIcon fontSize="small" />} link="/dashboard/transactions" />
        <SidebarMenuItem title="Categorias" icon={<ListAltRoundedIcon fontSize="small" />} link="/dashboard/categories" />
        <SidebarMenuItem title="Grupos" icon={<InterestsRoundedIcon fontSize="small" />} link="/dashboard/groups" />
        <SidebarMenuItem title="Contas" icon={<AccountBalanceRoundedIcon fontSize="small" />} link="/dashboard/bank-accounts" />
        <SidebarMenuItem title="Cartões de Crédito" icon={<CreditCardRoundedIcon fontSize="small" />} link="/dashboard/credit-cards" />
        <SidebarMenuItem title="Tags" icon={<BookmarksRoundedIcon fontSize="small" />} link="/dashboard/tags" />
        <SidebarMenuItem title="Relatórios" icon={<AssessmentRoundedIcon />} link="/dashboard/report" />
        <SidebarMenuItem title="Configurações" icon={<DisplaySettingsRoundedIcon fontSize="small" />} link="/dashboard/settings" />
      </List>
    </SidebarDrawer>
  );
}
