"use client";
import { useState } from "react";
import { Stack } from "@mui/material";
import TransactionsTable from "@/components/dashboard/tables/TransactionsTable";
import { TransactionContext } from "@/lib/hooks";
import { TransactionType } from "@/types/entities";
import PageTitle from "@/components/dashboard/page/PageTitle";
import PageContainer from "@/components/dashboard/page/PageContainer";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        list: transactions,
        setList: setTransactions,
      }}
    >
      <PageContainer>
        <Stack>
          <PageTitle title="Visão: despesas e receitas por dia de entrada" />
          <TransactionsTable />
        </Stack>
      </PageContainer>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
