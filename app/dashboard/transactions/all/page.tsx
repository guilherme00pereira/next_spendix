import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getPayedTransactions, getTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import Stack from "@mui/material/Stack";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import TransactionsFilter from "@/app/components/dashboard/widgets/filters/TransactionsFilter";
import TransactionsTableFilterProvider from "@/app/lib/providers/TransactionsTableFilterProvider";
import TransactionRows from "@/app/components/dashboard/tables/rows/TransactionRows";
import PageTopCard from "@/app/components/dashboard/surfaces/PageTopCard";
import TransactionTopPageInfo from "@/app/components/dashboard/surfaces/TransactionTopPageInfo";

const AllTransactions = async ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
  const startDate = searchParams.date ? dayjs(searchParams.date as string).startOf("M").format("YYYY-MM-DD") : dayjs().startOf("M").format("YYYY-MM-DD");
  const endDate = searchParams.date ? dayjs(searchParams.date as string).endOf("M").format("YYYY-MM-DD") : dayjs().endOf("M").format("YYYY-MM-DD");
  const transactions = await getPayedTransactions(startDate, endDate);


  const totalIncome = transactions
    .filter((transaction) => transaction.categories?.type === "Receita")
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.categories?.type === "Despesa")
    .reduce((acc, transaction) => acc + (transaction.payments?.amount ?? 0), 0);

  return (
    <PageContainer title="Lista de Transações por mês">
      <TransactionsTableFilterProvider>
        <PageTopCard>
          <TransactionTopPageInfo income={totalIncome} spendings={totalExpense} showDataSelector={true} />
        </PageTopCard>
        <Stack direction={{ xs: "column", md: "row" }} sx={{width: "100%"}} justifyContent="center">
          <TransactionsTable filters={<TransactionsFilter transactions={transactions} />}>
            <TransactionRows transactions={transactions} />
          </TransactionsTable>
        </Stack>
      </TransactionsTableFilterProvider>
    </PageContainer>
  );
};

export default AllTransactions;
