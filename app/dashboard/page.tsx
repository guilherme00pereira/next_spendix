import React from "react";
import { Grid, Paper } from "@mui/material";
import DashboardTotalAmountAvailable from "@/app/components/dashboard/widgets/home/DashboardTotalAmountAvailable";
import DashboardTopCard from "@/app/components/dashboard/widgets/home/DashboardTopCard";
import DashboardOverdueInvoices from "@/app/components/dashboard/widgets/home/DashboardOverdueInvoices";
import DashboardCardInvoices from "@/app/components/dashboard/widgets/home/DashboardCardInvoices";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import ParentCategoriesChartPaper from "@/app/components/dashboard/surfaces/ParentCategoriesChartPaper";

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
            <ParentCategoriesChartPaper title="Gastos por categoria no mês" />
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
