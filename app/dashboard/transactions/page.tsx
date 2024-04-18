"use client";
import {useState} from "react";
import {TransactionContext} from "@/lib/hooks";
import {TransactionType} from "@/types/entities";
import PageContainer from "@/components/dashboard/page/PageContainer";
import TransactionsByDueDayList from "@/components/dashboard/lists/TransactionsByDueDayDataList";
import TransactionsTimeline from "@/components/dashboard/lists/TransactionsTimeline";
import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/components/dashboard/lists/OverdueTransactionsList";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        list: transactions,
        setList: setTransactions,
      }}
    >
      <PageContainer title="Transações">
        <Grid container spacing={3} sx={{mb: 4}}>
          <Grid item xs={12} md={6}>

          </Grid>
        </Grid>
        <Masonry columns={2}>
          <TransactionsByDueDayList/>
          <TransactionsTimeline/>
          <OverdueTransactionsList/>
        </Masonry>
      </PageContainer>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
