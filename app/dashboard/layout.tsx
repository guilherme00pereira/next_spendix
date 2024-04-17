"use client";
import React, { useState } from "react";
import {styled, getInitColorSchemeScript} from "@mui/material/styles";
import type {} from '@mui/material/themeCssVarsAugmentation';
import Box from "@mui/material/Box";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { PageContext } from "@/lib/hooks";
import { useAppStore } from "@/lib/store";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import SpeedDialAdd from "@/components/dashboard/SpeedDialAdd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
})

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
        mediaQuery: "md"
      }}
    >
      <PersistQueryClientProvider client={queryClient} persistOptions={{persister: persister}}>
        {getInitColorSchemeScript()}
        <Box sx={{ display: "flex" }}>
          <Topbar open={openSidebar} toggleDrawer={setOpenSidebar} />
          <Sidebar open={openSidebar} toggleDrawer={setOpenSidebar} />
          <LayoutBoxWrapper component="main">
            {children}
          </LayoutBoxWrapper>
        </Box>
        <SpeedDialAdd />
      </PersistQueryClientProvider>
    </PageContext.Provider>
  );
}
