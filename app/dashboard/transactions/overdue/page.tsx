import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import { getOverdueTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import Stack from "@mui/material/Stack";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import OverdueTransactionRows from "@/app/components/dashboard/tables/rows/OverdueTransactionRows";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";

const OverdueTransactions = async () => {
  const transactions = (await getOverdueTransactions()) as TransactionType[];
  const categories = await getCategories();

  return (
    <PageContainer title="Lista de Transações do mês">
      <Stack direction="column" justifyContent="center">
        <TransactionsTableFilterProvider>
          <TransactionsTable filters={<TransactionsFilter transactions={transactions} />}>
            <OverdueTransactionRows transactions={transactions} />
          </TransactionsTable>
        </TransactionsTableFilterProvider>
      </Stack>
    </PageContainer>
  );
};

export default OverdueTransactions;
