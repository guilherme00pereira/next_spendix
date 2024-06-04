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
import { getDates, getTotals } from "@/app/lib/helpers";

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [startDate, endDate] = getDates(searchParams.date as string);
  const transactions = await getPayedTransactions(startDate, endDate);
  const transactionsMappedPerDay = groupTransactionsByDate(transactions);
  const [totalIncome, totalPaidSpendings, totalSpendings, dailyAverage] = getTotals(transactions);

  const spendingsData = mapDailyTransactionsToChart(transactionsMappedPerDay, TransactionTypeEnum.SPENDINGS);
  const incomeData = mapDailyTransactionsToChart(transactionsMappedPerDay, TransactionTypeEnum.INCOME);

  const headerLink = "/dashboard/transactions/all" + (searchParams.date ? `?date=${searchParams.date}` : "");

  return (
    <PageContainer title="Transações" showSelectMonthYear>
      <PageTopCard>
        <TransactionTopPageInfo
          income={totalIncome}
          paid={totalPaidSpendings}
          spendings={totalSpendings}
          mean={dailyAverage}
        />
      </PageTopCard>
      <Masonry columns={{ xs: 1, md: 2 }} spacing={2}>
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
