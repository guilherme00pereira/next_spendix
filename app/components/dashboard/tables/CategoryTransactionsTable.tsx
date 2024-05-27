"use client";
import React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { amountFormatter } from "@/app/lib/functions";
import { TransactionType } from "@/types/entities";
import dayjs from "dayjs";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import TransactionActionButtons from "../widgets/buttons/TransactionActionButtons";
import PeriodFilter from "../widgets/filters/PeriodFilter";
import { useCategoryDetailContext } from "@/app/lib/contexts";

const CategoryTransactionsTable = ({ transactions }: { transactions: TransactionType[] }) => {
  const { groupByMonth } = useCategoryDetailContext();

  const getFilterItems = () => {
    const items: string[] = [];
    if (groupByMonth) {
      transactions.forEach((transaction) => {
        const month = dayjs(transaction.due_date).format("MMMM");
        if (!items.includes(month)) {
          items.push(month);
        }
      });
    } else {
      transactions.forEach((transaction) => {
        const week = dayjs(transaction.due_date).week().toString();
        if (!items.includes(week)) {
          items.push(week);
        }
      });
    }
    return items;
  };

  return (
    <PaperContainer sx={{ width: "100%" }}>
      <PaperHeader title="Transações">
        <PeriodFilter items={getFilterItems()} />
      </PaperHeader>
      <TableContainer sx={{ maxHeight: "480px" }}>
        <Table stickyHeader size="small" aria-label="simple table">
          <TableBody>
            {transactions &&
              transactions.map((transaction: any) => (
                <TableRow key={transaction.id}>
                  <TableCell align="center">{dayjs(transaction.due_date).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{amountFormatter(transaction.amount)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
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

export default CategoryTransactionsTable;
