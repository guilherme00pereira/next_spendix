import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/app/components/dashboard/lists/TransactionsPerDayList";
import TransactionsPrediction from "@/app/components/dashboard/lists/TransactionsPrediction";
import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/app/components/dashboard/lists/OverdueTransactionsList";
import ApexCompareDailyTransactionsAndMean from "@/app/components/dashboard/charts/ApexCompareDailyTransactionsAndMean";
import SearchTransaction from "@/app/components/dashboard/widgets/transactions/SearchTransaction";
import { getPayedTransactions } from "@/app/lib/supabase/methods/transactions";
import dayjs from "dayjs";
import { TransactionType } from "@/types/entities";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";

async function fetchTransactions() {
  const res = await getPayedTransactions(dayjs().startOf("M").format("YYYY-MM-DD"), dayjs().endOf("M").format("YYYY-MM-DD"));
  return res as TransactionType[];
}

const TransactionsPage = async () => {
  const transactions = await fetchTransactions();
  // const totalIncome = transactions.reduce((acc, transaction) => {
  //   if(acc.payments && transaction.payments) {
  //     return acc.payments?.amount + transaction.payments.amount;
  //   }
  // });

  return (
    <PageContainer title="Transações">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <SearchTransaction />
        </Grid>
        <Grid item xs={12} md={2}>
          <TransactionsTotalsWidget value={12000} title="Total de receitas" income={true} color="success.dark" />
        </Grid>
        <Grid item xs={12} md={2}>
          <TransactionsTotalsWidget value={12000} title="Total de gastos" income={false} color="error.dark" />
        </Grid>
      </Grid>
      <Masonry columns={2} spacing={3}>
        <TransactionsPerDayList transactions={transactions as TransactionType[]} />
        <TransactionsPrediction />
        <ApexCompareDailyTransactionsAndMean />
        <OverdueTransactionsList />
      </Masonry>
    </PageContainer>
  );
};

export default TransactionsPage;
