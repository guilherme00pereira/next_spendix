import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import { Stack } from "@mui/system";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import TransactionRows from "@/app/components/dashboard/tables/rows/TransactionRows";

const AllTransactions = async () => {
  const transactions = await getTransactions(
    dayjs().startOf("M").format("YYYY-MM-DD"),
    dayjs().endOf("M").format("YYYY-MM-DD")
  );
  const categories = await getCategories();

  return (
    <PageContainer title="Lista de Transações por mês">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="center">
      <TransactionsTableFilterProvider>
          <TransactionsTable filters={<TransactionsFilter transactions={transactions} />}>
            <TransactionRows transactions={transactions} />
          </TransactionsTable>
        </TransactionsTableFilterProvider>
      </Stack>
    </PageContainer>
  );
};

export default AllTransactions;