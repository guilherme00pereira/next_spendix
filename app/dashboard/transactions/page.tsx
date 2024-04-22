"use client";
import { useState } from "react";
import { getTransactions } from "@/lib/supabase/methods/transactions";
import { TransactionContext } from "@/lib/hooks";
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
import ApexCompareDailyTransactionsAndMean from "@/components/dashboard/charts/ApexCompareDailyTransactionsAndMean";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const date = useAppStore((state) => state.date);

  const { data: allTransactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => pullTransactions(),
  });

  const pullTransactions = () => {
    return getTransactions(
      dayjs(date).startOf("M").format("YYYY-MM-DD"),
      dayjs(date).endOf("M").format("YYYY-MM-DD")
    ).then((data) => {
      return data as TransactionType[];
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        list: transactions,
        setList: setTransactions,
      }}
    >
      <PageContainer title="Transações">
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
        <Masonry columns={2} spacing={3}>
          {isLoading || (
            <>
              {allTransactions && <TransactionsPerDayList transactions={allTransactions} />}
              <ApexCompareDailyTransactionsAndMean />
              <TransactionsPrediction />
              <OverdueTransactionsList />
            </>
          )}
        </Masonry>
      </PageContainer>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
