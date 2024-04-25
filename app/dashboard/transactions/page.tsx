"use client";
import { useState } from "react";
import { TransactionType } from "@/types/entities";
import PageContainer from "@/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/components/dashboard/lists/TransactionsPerDayList";
import TransactionsPrediction from "@/components/dashboard/lists/TransactionsPrediction";
import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/components/dashboard/lists/OverdueTransactionsList";
import { useAppStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getPayedTransactions } from "@/lib/supabase/methods/transactions";
import ApexCompareDailyTransactionsAndMean from "@/components/dashboard/charts/ApexCompareDailyTransactionsAndMean";

const TransactionsPage = () => {
  const date = useAppStore((state) => state.date);

  const { data: allTransactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => pullTransactions(),
  });

  const pullTransactions = () => {
    return getPayedTransactions(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs(date).endOf("M").format("YYYY-MM-DD")).then((data) => {
      return data as TransactionType[];
    });
  };

  return (
    <PageContainer title="Transações">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Masonry columns={2} spacing={3}>
        {isLoading || (
          <>
            {allTransactions && <TransactionsPerDayList transactions={allTransactions} />}
            <TransactionsPrediction />
            <ApexCompareDailyTransactionsAndMean />
            <OverdueTransactionsList />
          </>
        )}
      </Masonry>
    </PageContainer>
  );
};

export default TransactionsPage;
