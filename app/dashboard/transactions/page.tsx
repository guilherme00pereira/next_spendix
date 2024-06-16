import React, { Suspense } from "react";
import Stack from "@mui/material/Stack";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsPerDayList from "@/app/components/dashboard/lists/TransactionsPerDayList";
import UpcomingTransactionsList from "@/app/components/dashboard/lists/UpcomingTransactionsList";
import Masonry from "@mui/lab/Masonry";
import OverdueTransactionsList from "@/app/components/dashboard/lists/OverdueTransactionsList";
import { getPayedTransactions, getTransactions } from "@/app/lib/supabase/methods/transactions";
import TransactionsPageHeroSection from "@/app/components/dashboard/surfaces/hero-sections/TransactionsPageHeroSection";
import ApexDailyTransactionsLineChart from "@/app/components/dashboard/surfaces/chart-papers/DailyTransactionsChartPaper";
import { groupTransactionsByDate, mapDailyTransactionsToChart } from "@/app/lib/helpers";
import { EndDateEnum, TransactionTypeEnum } from "@/types/enums";
import { getStartAndEndingDays, getTransactionsTotals } from "@/app/lib/helpers";
import TransactionsTopCardLoader from "@/app/components/dashboard/loaders/TransactionsTopCardLoader";

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [startDate, endDate] = getStartAndEndingDays(searchParams.date as string, EndDateEnum.END_OF_MONTH);
  const transactions = await getTransactions(startDate, endDate);
  const payedTransactions = await getPayedTransactions(startDate, endDate);
  const transactionsMappedPerDay = groupTransactionsByDate(payedTransactions);
  const [totalCashed, totalIncome, totalPaidSpendings, totalSpendings, dailyAverage] = getTransactionsTotals(
    transactions,
    payedTransactions
  );

  const spendingsData = mapDailyTransactionsToChart(transactionsMappedPerDay, TransactionTypeEnum.SPENDINGS);
  const incomeData = mapDailyTransactionsToChart(transactionsMappedPerDay, TransactionTypeEnum.INCOME);

  const headerLink = "/dashboard/transactions/all" + (searchParams.date ? `?date=${searchParams.date}` : "");

  return (
    <PageContainer title="Transações" showSelectMonthYear>
      <Stack direction={{ xs: "column", md: "row" }} width="100%">
        <Suspense fallback={<TransactionsTopCardLoader />}>
          <TransactionsPageHeroSection
            cashed={totalCashed}
            income={totalIncome}
            paid={totalPaidSpendings}
            spendings={totalSpendings}
            mean={dailyAverage}
          />
        </Suspense>
        <Suspense fallback={<p>loading</p>}>
          <ApexDailyTransactionsLineChart
            values={{ spendingsData, incomeData }}
            show={transactionsMappedPerDay.size > 0}
          />
        </Suspense>
      </Stack>
      <Suspense fallback={<p>loading</p>}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={2}>
          <TransactionsPerDayList
            transactions={transactionsMappedPerDay}
            headerLink={headerLink}
            selectedDate={searchParams.date?.toString() ?? ""}
          />

          <UpcomingTransactionsList />
          <OverdueTransactionsList />
        </Masonry>
      </Suspense>
    </PageContainer>
  );
};

export default TransactionsPage;
