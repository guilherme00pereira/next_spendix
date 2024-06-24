'use client'
import React from "react";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { Stack } from "@mui/material";
import Totals4Columns from "@/app/components/dashboard/surfaces/widgets-papers/Totals4Columns";
import { useAllTransactionsPageContext } from "@/app/lib/contexts";

const AllTransactionsPageHeroSection = () => {

  const {totalIncome, totalExpense, dailyMean} = useAllTransactionsPageContext();
  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" width="100%" spacing={2}>
      <Totals4Columns>
        <TransactionsTotalsWidget value={totalIncome} title="Entradas" income={true} color="success" />
      </Totals4Columns>
      <Totals4Columns>
        <TransactionsTotalsWidget value={totalExpense} title="Saídas" income={false} color="error" />
      </Totals4Columns>
      <Totals4Columns>
        <TransactionsTotalsWidget value={dailyMean} title="Média por dia" income={true} color="warning" />
      </Totals4Columns>
      <Totals4Columns>
        <TransactionsTotalsWidget value={totalIncome - totalExpense} title="Saldo" income={true} color="info" />
      </Totals4Columns>
    </Stack>
  );
};

export default AllTransactionsPageHeroSection;
