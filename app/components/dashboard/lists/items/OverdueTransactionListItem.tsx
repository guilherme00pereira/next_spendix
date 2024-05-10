'use client';
import { amountFormatter } from "@/app/lib/functions";
import { Typography } from "@mui/material";
import { Stack, Box } from "@mui/system";
import React from "react";
import { TransactionListItem } from "../../commonStyledComponents";
import { TransactionType } from "@/types/entities";
import { useTransactionContext } from "@/app/lib/contexts";
import { useSpeedDialStore } from "@/app/lib/store";
import dayjs from "dayjs";
import TransactionActionButtons from "@/app/components/dashboard/elements/TransactionActionButtons";

const getOverdueDays = (dueDate: string) => {
  const due = dayjs(dueDate);
  const today = dayjs();
  const overdue = today.diff(due, "days");
  let color = "info.dark";
  if(overdue > 30) color = "error.main";
  if(overdue > 15 && overdue <= 30) color = "warning.dark";
  return (
    <Typography variant="body2" color={color}>
      {overdue} dias
    </Typography>
  );
};

const OverdueTransactionListItem = ({ transaction }: { transaction: TransactionType }) => {
  const { setTransaction, actionShowTransactionDialog, setIncome, actionShowIncomeDialog } = useSpeedDialStore();
  const { actionShowTransactionDetail, setSelectedTransaction } = useTransactionContext();

  return (
    <TransactionListItem>
      <Box sx={{ mr: "24px" }}>
        {getOverdueDays(transaction.due_date)}
      </Box>
      <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
        <Typography variant="body1">{transaction.categories?.name}</Typography>
        <Typography variant="body2">{transaction.description}</Typography>
      </Stack>
      <Box sx={{ pr: "14px" }}>
        <Typography variant="body1">
          {amountFormatter(transaction.amount)}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="end">
        <TransactionActionButtons transaction={transaction} />
      </Stack>
    </TransactionListItem>
  );
};

export default OverdueTransactionListItem;
