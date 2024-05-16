import React from "react";
import { TransactionType } from "@/types/entities";
import { amountFormatter } from "@/app/lib/functions";
import { TableRow, TableCell, Typography } from "@mui/material";
import dayjs from "dayjs";
import TransactionActionButtons from "@/app/components/dashboard/elements/TransactionActionButtons";

const TransactionRow = ({ transaction }: { transaction: TransactionType }) => {
  return (
    <TableRow>
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

export default TransactionRow;
