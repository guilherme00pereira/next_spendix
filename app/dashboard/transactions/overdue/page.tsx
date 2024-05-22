import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import { getOverdueTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import Stack from "@mui/material/Stack";
import { getCategories } from "@/app/lib/supabase/methods/categories";

const OverdueTransactions = async () => {
  const transactions = (await getOverdueTransactions()) as TransactionType[];
  const categories = await getCategories();

  return (
    <PageContainer title="Lista de Transações do mês">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="center">
        <TransactionsTable transactions={transactions} categories={categories} />
      </Stack>
    </PageContainer>
  );
};

export default OverdueTransactions;
