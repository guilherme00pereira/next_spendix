import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { amountFormatter } from "@/lib/functions";
import { TransactionType } from "@/types/entities";
import dayjs from "dayjs";

const CategoryDetailsTable = ({ transactions }: { transactions: TransactionType[] }) => {
  return (
    <TableContainer sx={{ maxHeight: "70vh" }}>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{width: "25%"}}>Data</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: any) => (
            <TableRow key={transaction.id}>
              <TableCell align="center">{dayjs(transaction.due_date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{amountFormatter(transaction.amount)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
                <TableCell>
                    {transaction.payments ? "Pago" : ""}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryDetailsTable;
