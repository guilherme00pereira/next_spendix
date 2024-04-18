"use client";
import { Grid, Paper } from "@mui/material";
import React from "react";
import DashboardTotalAmountAvailable from "@/components/dashboard/widgets/home/DashboardTotalAmountAvailable";
import DashboardTopCard from "@/components/dashboard/widgets/home/DashboardTopCard";
import DashboardOverdueInvoices from "@/components/dashboard/widgets/home/DashboardOverdueInvoices";
import DashboardCardInvoices from "@/components/dashboard/widgets/home/DashboardCardInvoices";
import ApexParentCategoriesBarChart from "@/components/dashboard/charts/ApexParentCategoriesBarChart";
import PageContainer from "@/components/dashboard/page/PageContainer";

//TODO: Add a chart for categories % variation

const DashboardPage = () => {

  return (
    <PageContainer title="Dashboard" hideBreadcrumb>
      <Grid container spacing={3} sx={{mb: 4}}>
        <Grid item xs={12} md={3}>
          <DashboardTotalAmountAvailable />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardOverdueInvoices />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCardInvoices />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardTopCard title="New Card" bottomValue="0" loading={false}>Add text</DashboardTopCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <ApexParentCategoriesBarChart title="Categorias" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <h2>Teste</h2>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashboardPage;
