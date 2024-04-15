"use client";
import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import DashboardTotalAmountAvailable from "@/components/dashboard/widgets/DashboardTotalAmountAvailable";
import DashboardTopCard from "@/components/dashboard/widgets/DashboardTopCard";
import DashboardOverdueInvoices from "@/components/dashboard/widgets/DashboardOverdueInvoices";
import DashboardCardInvoices from "@/components/dashboard/widgets/DashboardCardInvoices";
import ApexParentCategoriesBarChart from "@/components/dashboard/charts/ApexParentCategoriesBarChart";

//TODO: Add a chart for categories % variation

const DashboardPage = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        <Paper sx={{p: 2}}>
            <ApexParentCategoriesBarChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <h2>Teste</h2>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
