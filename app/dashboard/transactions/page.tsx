"use client";
import { useState } from "react";
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
import { getPayedTransactions } from "@/lib/supabase/methods/transactions";
import ApexCompareDailyTransactionsAndMean from "@/components/dashboard/charts/ApexCompareDailyTransactionsAndMean";
import TransactionDetailRightDrawer from "@/components/dashboard/surfaces/TransactionDetailRightDrawer";

const TransactionsPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>({} as TransactionType);
  const [toggleTransactionDetail, setToggleTransactionDetail] = useState(false);
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
    <TransactionContext.Provider
      value={{
        selectedTransaction,
        setSelectedTransaction,
        showTransactionDetail: toggleTransactionDetail,
        actionShowTransactionDetail: setToggleTransactionDetail,
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
              <TransactionsPrediction />
              <ApexCompareDailyTransactionsAndMean />
              <OverdueTransactionsList />
            </>
          )}
        </Masonry>
        <TransactionDetailRightDrawer />
      </PageContainer>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
