import React from "react";
import { useSpeedDialStore } from "@/lib/hooks";
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
  const { setTransaction, actionShowTransactionDialog } = useSpeedDialStore();

  const handleEdit = (t: TransactionType) => {
    setTransaction({
      id: t.id,
      amount: t.amount,
      due_date: dayjs(t.due_date),
      description: t.description,
      cashed: !!t.payments?.id,
      category_id: t.categories?.id ?? 0,
      payment_date: t.payments?.date ? dayjs(t.payments.date) : null,
      payed_amount: t.payments?.amount ?? null,
      payment_method_id: 1,
      payment_id: t.payments?.id ?? 0,
      in_installments: t.installments ? true : false,
      installments: 2,
      draft: t.draft,
    });
    actionShowTransactionDialog(true);
  }

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
          {transactions && transactions.map((transaction: any) => (
            <TableRow key={transaction.id} onClick={() => handleEdit(transaction)} sx={{cursor: "pointer"}}>
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
