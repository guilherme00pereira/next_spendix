"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { PageContext } from "@/lib/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SpeedDialAdd from "@/components/dashboard/SpeedDialAdd";
import Breadcrumb from "@/components/dashboard/Breadcrumb";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Box sx={{ display: "flex" }}>
          <Topbar open={open} toggleDrawer={toggleDrawer} />
          <Sidebar open={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar sx={{margin: "48px 0"}}>
              <Breadcrumb />
            </Toolbar>
            {children}
          </Box>
        </Box>
        <SpeedDialAdd />
      </QueryClientProvider>
    </PageContext.Provider>
  );
}
