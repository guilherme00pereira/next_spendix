"use client";
import React, { useState } from "react";
import { styled, getInitColorSchemeScript } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from "@mui/material/Box";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Topbar from "@/app/components/dashboard/Topbar";
import { PageContext } from "@/app/lib/contexts";
import { useAppStore } from "@/app/lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionContext } from "@/app/lib/contexts";
import SpeedDialAdd from "@/app/components/dashboard/SpeedDialAdd";
import TransactionDetailRightDrawer from "@/app/components/dashboard/surfaces/TransactionDetailRightDrawer";
import { TransactionType } from "@/types/entities";
import TransactionProvider from "../lib/providers/TransactionProvider";

const queryClient = new QueryClient();

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
  

  return (
    <PageContext.Provider
      value={{
        showModal: showAdd,
        actionShowModal: setShowAdd,
        mediaQuery: "md",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <TransactionProvider>
          {getInitColorSchemeScript()}
          <Box sx={{ display: "flex" }}>
            <Topbar open={openSidebar} toggleDrawer={setOpenSidebar} />
            <Sidebar open={openSidebar} toggleDrawer={setOpenSidebar} />
            <LayoutBoxWrapper component="main">{children}</LayoutBoxWrapper>
          </Box>
          <SpeedDialAdd />
          <TransactionDetailRightDrawer />
        </TransactionProvider>
      </QueryClientProvider>
    </PageContext.Provider>
  );
}
