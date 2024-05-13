'use client';
import React from "react";
import { amountFormatter } from "@/app/lib/functions";
import { Typography } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { TransactionListItem } from "../../commonStyledComponents";
import { TransactionType } from "@/types/entities";
import TransactionActionButtons from "@/app/components/dashboard/elements/TransactionActionButtons";
import dayjs from "dayjs";

const getOverdueDays = (dueDate: string) => {
  const due = dayjs(dueDate);
  const today = dayjs();
  const overdue = today.diff(due, "d");
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
