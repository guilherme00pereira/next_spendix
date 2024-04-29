import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { amountFormatter } from "@/lib/functions";
import { TransactionType } from "@/types/entities";
import dayjs from "dayjs";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import TransactionActionButtons from "../buttons/TransactionActionButtons";

const TransactionsTable = ({ transactions }: { transactions: TransactionType[] }) => {

  return (
    <PaperContainer>
      <PaperHeader title="Transações por dia" />
      <TableContainer sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader size="small" aria-label="simple table">
          <TableBody>
            {transactions &&
              transactions.map((transaction: any) => (
                <TableRow key={transaction.id}>
                  <TableCell align="center">{dayjs(transaction.due_date).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{amountFormatter(transaction.amount)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.payments ? "Pago" : ""}</TableCell>
                  <TableCell>
                    <TransactionActionButtons transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContainer>
  );
};

export default TransactionsTable;
