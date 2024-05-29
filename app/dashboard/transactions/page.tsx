import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/app/components/dashboard/lists/TransactionsPerDayList";
import TransactionsForecast from "@/app/components/dashboard/lists/TransactionsForecast";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/app/components/dashboard/lists/OverdueTransactionsList";
import { getPayedTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import { TransactionType } from "@/types/entities";
import PageTopCard from "@/app/components/dashboard/surfaces/PageTopCard";
import TransactionTopPageInfo from "@/app/components/dashboard/surfaces/TransactionTopPageInfo";
import DailyTransactionsChartPaper from "@/app/components/dashboard/surfaces/chart-papers/DailyTransactionsChartPaper";
import { ChartBarType } from "@/types/chart-types";

const TransactionsPage = async () => {
  const transactions = await getPayedTransactions(dayjs().startOf("M").format("YYYY-MM-DD"), dayjs().endOf("M").format("YYYY-MM-DD"));
  const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === "Receita")
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.categories?.type === "Despesa")
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);

    // const chartData: ChartBarType[] = transactions
    // .sort((a: ChartBarType, b: ChartBarType) => a.value - b.value)
    // .reverse()
    // .map((item: ChartBarType) => {
    //   return {
    //     name: item.name,
    //     value: item.value,
    //     label: "R$" + item.value.toFixed(2),
    //   };
    // });

  return (
    <PageContainer title="Transações">
      <PageTopCard>
        <TransactionTopPageInfo income={totalIncome} spendings={totalExpense} showDataSelector={false} />
      </PageTopCard>
      <Masonry columns={2} spacing={2}>
        <TransactionsPerDayList transactions={transactions as TransactionType[]} />
        <DailyTransactionsChartPaper data={[]} />
        <TransactionsForecast />
        <OverdueTransactionsList />
      </Masonry>
    </PageContainer>
  );
};

export default TransactionsPage;
