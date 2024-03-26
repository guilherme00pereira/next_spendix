"use client";
import { useState } from "react";
import { Stack, Container, Typography } from "@mui/material";
import TransactionsTable from "@/components/dashboard/tables/TransactionsTable";
import Box from "@mui/material/Box";
import { TransactionContext } from "@/lib/hooks";
import { TransactionType } from "@/types/entities";
import PageTitle from "@/components/dashboard/PageTitle";

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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack>
          <PageTitle title="Visão: despesas e receitas por dia de entrada" />
          <TransactionsTable />
        </Stack>
      </Container>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
