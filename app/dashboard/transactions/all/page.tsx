import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getPayedTransactions, getTransactions } from "@/app/lib/supabase/methods/transactions";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import Stack from "@mui/material/Stack";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import TransactionRows from "@/app/components/dashboard/tables/rows/TransactionRows";
import PageTopCard from "@/app/components/dashboard/surfaces/PageTopCard";
import TransactionTopPageInfo from "@/app/components/dashboard/surfaces/TransactionTopPageInfo";
import ScrollToTop from "@/app/components/dashboard/page/ScrollToTop";
import { getDates, getTotals } from "@/app/lib/helpers";

const AllTransactions = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [startDate, endDate] = getDates(searchParams.date as string);
  const transactions =
    searchParams.due_date === "1"
      ? await getTransactions(startDate, endDate)
      : await getPayedTransactions(startDate, endDate);
  const [totalIncome, totalPaidSpendings, totalSpendings, dailyAverage] = getTotals(transactions);

  return (
    <PageContainer title="Lista de Transações por mês" showSelectMonthYear>
      <TransactionsTableFilterProvider>
        <PageTopCard>
          <TransactionTopPageInfo
            income={totalIncome}
            paid={totalPaidSpendings}
            spendings={totalSpendings}
            mean={dailyAverage}
          />
        </PageTopCard>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }} justifyContent="center">
          <TransactionsTable filters={<TransactionsFilter transactions={transactions} />}>
            <TransactionRows transactions={transactions} />
          </TransactionsTable>
        </Stack>
        <ScrollToTop />
      </TransactionsTableFilterProvider>
    </PageContainer>
  );
};

export default AllTransactions;
