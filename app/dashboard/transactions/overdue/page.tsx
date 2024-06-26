import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import { getOverdueTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import Stack from "@mui/material/Stack";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import OverdueTransactionRows from "@/app/components/dashboard/tables/rows/OverdueTransactionRows";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";

const OverdueTransactions = async () => {
  const transactions = (await getOverdueTransactions()) as TransactionType[];
  const categories = await getCategories();

  return (
    <PageContainer title="Contas em atraso" breadcrumb={<Breadcrumbs steps={[{title: "Contas em atraso"}]} />}>
        <TransactionsTableFilterProvider>
        <Stack sx={{width: "90%"}} justifyContent="center">
          <TransactionsTable title="Contas em atraso">
            <OverdueTransactionRows transactions={transactions} />
          </TransactionsTable>
          </Stack>
        </TransactionsTableFilterProvider>
    </PageContainer>
  );
};

export default OverdueTransactions;
