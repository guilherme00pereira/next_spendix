import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/app/components/dashboard/lists/TransactionsPerDayList";
import TransactionsPrediction from "@/app/components/dashboard/lists/TransactionsPrediction";
import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/app/components/dashboard/lists/OverdueTransactionsList";
import ApexCompareDailyTransactionsAndMean from "@/app/components/dashboard/charts/ApexCompareDailyTransactionsAndMean";

const TransactionsPage = () => {

  return (
    <PageContainer title="Transações">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Masonry columns={2} spacing={3}>
          
            <TransactionsPerDayList />
            <OverdueTransactionsList />
            <TransactionsPrediction />
            <ApexCompareDailyTransactionsAndMean />
          
      </Masonry>
    </PageContainer>
  );
};

export default TransactionsPage;
