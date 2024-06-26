import React from "react";
import Stack from "@mui/material/Stack";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import TransactionRows from "@/app/components/dashboard/tables/rows/TransactionRows";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import { TransactionType } from "@/types/entities";
import { getFutureTransactions } from "@/app/lib/supabase/methods/transactions";
import { getStartAndEndingDays } from "@/app/lib/helpers";
import { EndDateEnum } from "@/types/enums";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";

const PageUpcoming = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const [startDate, endDate] = getStartAndEndingDays(searchParams.date as string, EndDateEnum.END_OF_MONTH);
  const transactions = (await getFutureTransactions(startDate, endDate)) as TransactionType[];

  return (
    <PageContainer title="Próximos lançamentos" showSelectMonthYear breadcrumb={<Breadcrumbs steps={[{title: "Próximos lançamentos"}]} />}>
      <TransactionsTableFilterProvider>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }} justifyContent="center">
          <TransactionsTable title="Próximos lançamentos" filters={<TransactionsFilter transactions={transactions} />}>
            <TransactionRows transactions={transactions} />
          </TransactionsTable>
        </Stack>
      </TransactionsTableFilterProvider>
    </PageContainer>
  );
};

export default PageUpcoming;
