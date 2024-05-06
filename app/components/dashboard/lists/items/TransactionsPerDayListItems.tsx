'use client';
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { TransactionType } from "@/types/entities";
import Typography from "@mui/material/Typography";
import { amountFormatter } from "@/app/lib/functions";
import { TransactionListItem } from "@/app/components/dashboard/commonStyledComponents";
import TransactionActionButtons from "@/app/components/dashboard/buttons/TransactionActionButtons";
import { useTransactionsPerDayContext } from "@/app/lib/contexts";
import dayjs from "dayjs";

const TransactionsPerDayListItems = ({transactions}: {transactions: Map<string, TransactionType[]>}) => {
  const { selectedDay, dailyTransactions, setDailyTransactions } = useTransactionsPerDayContext();

  useEffect(() => {
    if (selectedDay) {
      setDailyTransactions(transactions.get(selectedDay) ?? []);
    } else {
      setDailyTransactions(transactions.get(dayjs().format("YYYY-MM-DD")) ?? []);
    }
  }, [selectedDay]);

  return (
    <>
      {dailyTransactions.map((transaction: TransactionType) => (
        <TransactionListItem key={transaction.id}>
          <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{transaction.categories?.name}</Typography>
            <Typography variant="subtitle2">{transaction.description}</Typography>
          </Stack>
          <Box sx={{ pr: "14px" }}>
            <Typography variant="body1" color={transaction.categories?.type == "Receita" ? "success.dark" : "error.dark"}>
              {amountFormatter(transaction.payments?.amount ?? transaction.amount)}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="end">
            <TransactionActionButtons transaction={transaction} />
          </Stack>
        </TransactionListItem>
      ))}
    </>
  );
};

export default TransactionsPerDayListItems;
