import React from "react";
import Stack from "@mui/material/Stack";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import TransactionRows from "@/app/components/dashboard/tables/rows/TransactionRows";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import { TransactionType } from "@/types/entities";
import { getFutureTransactions } from "@/app/lib/actions/transactions-actions";
import { getDates } from "@/app/lib/helpers";

const PageUpcoming = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const [startDate, endDate] = getDates(searchParams.date as string);
  const transactions = (await getFutureTransactions(startDate, endDate)) as TransactionType[];

  return (
    <PageContainer title="Próximos lançamentos" showSelectMonthYear>
      <TransactionsTableFilterProvider>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }} justifyContent="center">
          <TransactionsTable filters={<TransactionsFilter transactions={transactions} />}>
            <TransactionRows transactions={transactions} />
          </TransactionsTable>
        </Stack>
      </TransactionsTableFilterProvider>
    </PageContainer>
  );
};

export default PageUpcoming;
