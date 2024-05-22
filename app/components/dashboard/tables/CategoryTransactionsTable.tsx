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
import { useCategoryDetailContext } from "@/app/lib/contexts";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

const CategoryTransactionsTable = ({ transactions }: { transactions: TransactionType[] }) => {
  const { groupByMonth } = useCategoryDetailContext();

  return (
    <PaperContainer>
      <PaperHeader title="Transações por dia">
        <Button variant="contained">
          <FilterListRoundedIcon fontSize="small" />
          Filtrar
        </Button>
      </PaperHeader>
      <TableContainer sx={{ maxHeight: "60vh" }}>
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
