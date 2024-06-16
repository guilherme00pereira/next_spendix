import React, { Suspense } from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getPayedTransactions, getTransactions } from "@/app/lib/supabase/methods/transactions";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import Stack from "@mui/material/Stack";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import TransactionRows from "@/app/components/dashboard/tables/rows/TransactionRows";
import TransactionsTopCardLoader from "@/app/components/dashboard/loaders/TransactionsTopCardLoader";
import ScrollToTop from "@/app/components/dashboard/page/ScrollToTop";
import { getStartAndEndingDays, getTransactionsTotals } from "@/app/lib/helpers";
import { EndDateEnum } from "@/types/enums";
import AllTransactionsPageHeroSection from "@/app/components/dashboard/surfaces/hero-sections/AllTransactionsPageHeroSection";

const AllTransactions = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const end = searchParams.end ? EndDateEnum.END_OF_MONTH : EndDateEnum.TODAY;
  const [startDate, endDate] = getStartAndEndingDays(searchParams.date as string, end);
  const transactions = await getTransactions(startDate, endDate);
  const payedTransactions = await getPayedTransactions(startDate, endDate);
  const [totalCashed, totalPaidSpendings, dailyAverage] = getTransactionsTotals(transactions, payedTransactions);

  let filteredTransactions = searchParams.income
    ? transactions.filter((t) => t.categories?.type === "Receita")
    : transactions;

  filteredTransactions = searchParams.spendings
    ? transactions.filter((t) => t.categories?.type === "Despesa")
    : filteredTransactions;

  filteredTransactions = searchParams.day
    ? transactions.filter((t) => t.due_date.substr(-2) === searchParams.day)
    : filteredTransactions;

  return (
    <PageContainer title="Todas as transações do mês" showSelectMonthYear>
      <TransactionsTableFilterProvider>
        <Stack direction={{ xs: "column", md: "row" }} width="100%">
          <Suspense fallback={<TransactionsTopCardLoader />}>
            <AllTransactionsPageHeroSection cashed={totalCashed} paid={totalPaidSpendings} mean={dailyAverage} />
          </Suspense>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }} justifyContent="center">
          <Suspense fallback={<p>loading</p>}>
          <TransactionsTable filters={<TransactionsFilter transactions={filteredTransactions} />}>
            <TransactionRows transactions={filteredTransactions} />
          </TransactionsTable>
          </Suspense>
        </Stack>
        
      </TransactionsTableFilterProvider>
    </PageContainer>
  );
};

export default AllTransactions;
