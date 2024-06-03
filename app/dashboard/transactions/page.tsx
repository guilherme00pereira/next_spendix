import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/app/components/dashboard/lists/TransactionsPerDayList";
import TransactionsForecast from "@/app/components/dashboard/lists/TransactionsForecast";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/app/components/dashboard/lists/OverdueTransactionsList";
import { getPayedTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import PageTopCard from "@/app/components/dashboard/surfaces/PageTopCard";
import TransactionTopPageInfo from "@/app/components/dashboard/surfaces/TransactionTopPageInfo";
import ApexDailyTransactionsLineChart from "@/app/components/dashboard/surfaces/chart-papers/DailyTransactionsChartPaper";
import { groupTransactionsByDate, mapDailyTransactionsToChart } from "@/app/lib/functions";
import { TransactionTypeEnum } from "@/types/enums";

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const startDate = searchParams.date
    ? dayjs(searchParams.date as string)
        .startOf("M")
        .format("YYYY-MM-DD")
    : dayjs().startOf("M").format("YYYY-MM-DD");
  const endDate = searchParams.date
    ? dayjs(searchParams.date as string)
        .endOf("M")
        .format("YYYY-MM-DD")
    : dayjs().endOf("M").format("YYYY-MM-DD");
  const transactions = await getPayedTransactions(startDate, endDate);

  const headerLink = "/dashboard/transactions/all" + (searchParams.date ? `?date=${searchParams.date}` : "");

  const transactionsMappedPerDay = groupTransactionsByDate(transactions);
  const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.INCOME)
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.categories?.type === TransactionTypeEnum.SPENDINGS)
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);

  const spendingsData = mapDailyTransactionsToChart(transactionsMappedPerDay, TransactionTypeEnum.SPENDINGS);
  const incomeData = mapDailyTransactionsToChart(transactionsMappedPerDay, TransactionTypeEnum.INCOME);

  return (
    <PageContainer title="Transações">
      <PageTopCard>
        <TransactionTopPageInfo income={totalIncome} spendings={totalExpense} />
      </PageTopCard>
      <Masonry columns={{xs: 1, md: 2}} spacing={2}>
        <TransactionsPerDayList
          transactions={transactionsMappedPerDay}
          headerLink={headerLink}
          selectedDate={searchParams.date?.toString() ?? ""}
        />
        <ApexDailyTransactionsLineChart
          values={{ spendingsData, incomeData }}
          show={transactionsMappedPerDay.size > 0}
        />
        <TransactionsForecast />
        <OverdueTransactionsList />
      </Masonry>
    </PageContainer>
  );
};

export default TransactionsPage;
