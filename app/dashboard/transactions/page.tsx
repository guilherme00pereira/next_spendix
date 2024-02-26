"use client";
import { useState } from "react";
import { Stack, Container, Typography } from "@mui/material";
import TransactionsTable from "@/components/dashboard/tables/TransactionsTable";
import Box from "@mui/material/Box";
import { TransactionContext } from "@/lib/hooks";
import {TransactionType} from "@/types/entities";

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
        <Box sx={{mb: 4}}>
            <Typography variant="h5" textAlign="center">
              Visão: despesas e receitas por dia
            </Typography>
        </Box>
          <TransactionsTable />
      </Container>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
