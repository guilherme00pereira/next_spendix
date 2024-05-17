"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { TransactionType } from "@/types/entities";
import TransactionRow from "@/app/components/dashboard/tables/rows/TransactionRow";
import TransactionsFilters from "../widgets/filters/TransactionsFilters";
import { ITransactionTableProps } from "@/types/interfaces";

const TransactionsTable = ({ transactions, categories }: ITransactionTableProps) => {
  const [filteredTransactions, setFilteredTransactions] = React.useState<TransactionType[]>(transactions);

  const searchTransaction = (search: string) => {
    if (search === "") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((t) => t.description.toLowerCase().includes(search.toLowerCase())));
    }
  };

  return (
    <PaperContainer sx={{ width: "90%" }}>
      <PaperHeader title="Transações">
        <TransactionsFilters action={searchTransaction} />
      </PaperHeader>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {filteredTransactions.length > 0 && transactions.map((transaction: any) => <TransactionRow key={transaction.id} transaction={transaction} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </PaperContainer>
  );
};

export default TransactionsTable;
