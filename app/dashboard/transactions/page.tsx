"use client";
import { useEffect, useState } from "react";
import { Stack, Container, Typography } from "@mui/material";
import ListTransactionsTable from "@/components/dashboard/tables/ListTransactionsTable";
import Box from "@mui/material/Box";
import { useAppStore, TransactionContext } from "@/lib/hooks";
import {TransactionType} from "@/types/entities";
import dayjs from "dayjs";

const TransactionsPage = () => {
  const {date} = useAppStore();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [monthAndYear, setMonthAndYear] = useState<string>(dayjs().format("MMMM [de] YYYY"));

  useEffect(() => {
    setMonthAndYear(dayjs(date).format("MMMM [de] YYYY"));
  }, [date]);

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        list: transactions,
        setList: setTransactions,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent={{ xs: "center", sm: "space-between" }} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5" textAlign="center">
              Transações em {monthAndYear}
            </Typography>
          </Stack>
          <ListTransactionsTable />
        </Box>
      </Container>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
