import React from "react";
import { TransactionType } from "@/types/entities";
import { amountFormatter } from "@/app/lib/functions";
import { TableRow, TableCell, TableBody } from "@mui/material";
import dayjs from "dayjs";
import TransactionActionButtons from "@/app/components/dashboard/widgets/buttons/TransactionActionButtons";

const TransactionRows = ({ transactions }: { transactions: TransactionType[] }) => {
  return (
    <TableBody>
            {transactions.length > 0 && transactions.map((transaction: TransactionType) => (
              <TableRow key={transaction.id}>
              <TableCell align="center">{dayjs(transaction.due_date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{transaction.categories?.name}</TableCell>
              <TableCell>{amountFormatter(transaction.amount)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <TransactionActionButtons transaction={transaction} />
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
    
  );
};

export default TransactionRows;
