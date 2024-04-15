"use client";
import React, { useState } from "react";
import {styled, getInitColorSchemeScript} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { PageContext } from "@/lib/hooks";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import SpeedDialAdd from "@/components/dashboard/SpeedDialAdd";
import Breadcrumb from "@/components/dashboard/Breadcrumb";

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
  backgroundColor: theme.palette.background.default,
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          <Topbar open={open} toggleDrawer={toggleDrawer} />
          <Sidebar open={open} toggleDrawer={toggleDrawer} />
          <LayoutBoxWrapper component="main">
            <Toolbar sx={{margin: "48px 0"}}>
              <Breadcrumb />
            </Toolbar>
            {children}
          </LayoutBoxWrapper>
        </Box>
        <SpeedDialAdd />
      </PersistQueryClientProvider>
    </PageContext.Provider>
  );
}
