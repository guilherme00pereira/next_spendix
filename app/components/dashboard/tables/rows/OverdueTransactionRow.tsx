import React from "react";
import { TransactionType } from "@/types/entities";
import { amountFormatter } from "@/app/lib/functions";
import { TableRow, TableCell, Typography } from "@mui/material";
import dayjs from "dayjs";
import TransactionActionButtons from "@/app/components/dashboard/widgets/buttons/TransactionActionButtons";

const getOverdueDays = (dueDate: string) => {
  const due = dayjs(dueDate);
  const today = dayjs();
  const overdue = today.diff(due, "d");
  let color = "info.dark";
  if (overdue > 30) color = "error.main";
  if (overdue > 15 && overdue <= 30) color = "warning.dark";
  return (
    <Typography variant="body2" color={color}>
      {overdue} dias
    </Typography>
  );
};

const OverdueTransactionRow = ({ transaction }: { transaction: TransactionType }) => {
  return (
    <TableRow>
      <TableCell>{getOverdueDays(transaction.due_date)}</TableCell>
      <TableCell align="center">{dayjs(transaction.due_date).format("DD/MM/YYYY")}</TableCell>
      <TableCell>{transaction.categories?.name}</TableCell>
      <TableCell>{amountFormatter(transaction.amount)}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        <TransactionActionButtons transaction={transaction} />
      </TableCell>
    </TableRow>
  );
};

export default OverdueTransactionRow;
