"use client";
import React, { useState } from "react";
import {styled, getInitColorSchemeScript} from "@mui/material/styles";
import type {} from '@mui/material/themeCssVarsAugmentation';
import Box from "@mui/material/Box";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { PageContext } from "@/lib/contexts";
import { useAppStore } from "@/lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionContext } from "@/lib/contexts";
import SpeedDialAdd from "@/components/dashboard/SpeedDialAdd";
import TransactionDetailRightDrawer from "@/components/dashboard/surfaces/TransactionDetailRightDrawer";
import { TransactionType } from "@/types/entities";

const queryClient = new QueryClient()

const LayoutBoxWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.default,
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const openSidebar = useAppStore((state) => state.openSidebar);
  const setOpenSidebar = useAppStore((state) => state.setOpenSidebar);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>({} as TransactionType);
  const [toggleTransactionDetail, setToggleTransactionDetail] = useState(false);

  return (
    <PageContext.Provider
      value={{
        showModal: showAdd,
        actionShowModal: setShowAdd,
        mediaQuery: "md"
      }}
    >

      <QueryClientProvider client={queryClient}>
      <TransactionContext.Provider
      value={{
        selectedTransaction,
        setSelectedTransaction,
        showTransactionDetail: toggleTransactionDetail,
        actionShowTransactionDetail: setToggleTransactionDetail,
      }}
    >
        {getInitColorSchemeScript()}
        <Box sx={{ display: "flex" }}>
          <Topbar open={openSidebar} toggleDrawer={setOpenSidebar} />
          <Sidebar open={openSidebar} toggleDrawer={setOpenSidebar} />
          <LayoutBoxWrapper component="main">
            {children}
          </LayoutBoxWrapper>
        </Box>
        <SpeedDialAdd />
        <TransactionDetailRightDrawer />
      </TransactionContext.Provider>
        </QueryClientProvider>
      
        
    </PageContext.Provider>
  );
}
