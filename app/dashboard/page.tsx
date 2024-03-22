"use client";
import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import DashboardTotalAmountAvailable from "@/components/dashboard/widgets/DashboardTotalAmountAvailable";
import DashboardTopCard from "@/components/dashboard/panels-and-cards/DashboardTopCard";
import DashboardOverdueBills from "@/components/dashboard/widgets/DashboardOverdueBills";

//TODO: Add a chart for categories % variation

const page = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} sx={{mb: 4}}>
        <Grid item xs={12} md={3}>
          <DashboardTotalAmountAvailable />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardOverdueBills />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardTopCard title="New Card" bottomValue="0">Add text</DashboardTopCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardTopCard title="New Card" bottomValue="0">Add text</DashboardTopCard>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <Paper>
            <h2>Teste</h2>
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

export default page;
