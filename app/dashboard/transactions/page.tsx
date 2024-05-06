import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/app/components/dashboard/lists/TransactionsPerDayList";
import TransactionsForecast from "@/app/components/dashboard/lists/TransactionsForecast";
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
  const res = await getPayedTransactions(dayjs().startOf("M").format("YYYY-MM-DD"));
  return res as TransactionType[];
}

const TransactionsPage = async () => {
  const transactions = await fetchTransactions();
  const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === "Receita")
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.categories?.type === "Despesa")
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);

  return (
    <PageContainer title="Transações">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <SearchTransaction />
        </Grid>
        <Grid item xs={12} md={3}>
          <TransactionsTotalsWidget value={totalIncome} title="Total de receitas" income={true} color="success.dark" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TransactionsTotalsWidget value={totalExpense} title="Total de gastos" income={false} color="error.dark" />
        </Grid>
      </Grid>
      <Masonry columns={2} spacing={3}>
          <TransactionsPerDayList transactions={transactions as TransactionType[]} />      
          <TransactionsForecast />
        {/* <ApexCompareDailyTransactionsAndMean /> */}      
          <OverdueTransactionsList />
      </Masonry>
    </PageContainer>
  );
};

export default TransactionsPage;
