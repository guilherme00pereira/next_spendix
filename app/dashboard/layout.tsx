import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "@/app/components/dashboard/sidebar/Sidebar";
import Topbar from "@/app/components/dashboard/topbar/Topbar";
import TransactionDetailRightDrawer from "@/app/components/dashboard/drawers/TransactionDetailRightDrawer";
import TransactionProvider from "../lib/providers/TransactionProvider";
import PageProvider from "../lib/providers/PageProvider";
import SidebarProvider from "../lib/providers/SidebarProvider";
import PageWrapper from "../components/dashboard/page/PageWrapper";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
      <PageProvider>
        <TransactionProvider>
          <Box sx={{ display: "flex" }}>
            <SidebarProvider>
              <Topbar />
              <Sidebar />
            </SidebarProvider>
            <PageWrapper>{children}</PageWrapper>
          </Box>
          <TransactionDetailRightDrawer />
        </TransactionProvider>
      </PageProvider>
  );
};

export default Dashboard;
