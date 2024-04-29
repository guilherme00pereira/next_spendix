import React, {useEffect, useState} from 'react';
import {useTransactionContext} from "@/lib/contexts";
import {TransactionType} from "@/types/entities";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {CircularProgress, Typography} from "@mui/material";
import {amountFormatter, groupTransactionsByDate} from "@/lib/functions";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {getTransactions} from "@/lib/supabase/methods/transactions";
import TransactionRow from "@/components/dashboard/tables/TransactionRow";

const CashFlowTable = () => {
  const {date, list, setList} = useTransactionContext();
  const [mappedTransactions, setMappedTransactions] = useState<Map<string, TransactionType[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTransactions(date.startOf('M').format('YYYY-MM-DD'), date.endOf('M').format('YYYY-MM-DD')).then((data) => {
      setList(data as TransactionType[]);
      setIsLoading(false);
      setMappedTransactions(groupTransactionsByDate(data as TransactionType[]));
    });
  }, [date]);


  const getIncomeTotal = () => {
    // @ts-ignore
    return list
      ?.filter((transaction: any) => transaction.categories.type === "Receita")
      .map((transaction: any) => transaction.payed_amount)
      .reduce((acc: number, curr: number) => acc + curr, 0) ?? 0;
  }

  const getExpenseTotal = () => {
    // @ts-ignore
    return list
      ?.filter((transaction: any) => transaction.categories.type !== "Receita")
      .map((transaction: any) => transaction.payed_amount)
      .reduce((acc: number, curr: number) => acc + curr, 0) ?? 0;
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} sx={styles.emptyTableCell} />
            <TableCell align="center" sx={styles.emptyTableCell} >
              <Typography fontWeight="bold" color="info.main">
                {amountFormatter(getIncomeTotal())}
              </Typography>
            </TableCell>
            <TableCell align="center" sx={styles.emptyTableCell} >
              <Typography fontWeight="bold" color="secondary.main">
                {amountFormatter(getExpenseTotal())}
              </Typography>
            </TableCell>
            <TableCell sx={styles.emptyTableCell} />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Balanço</TableCell>
            <TableCell align="center">Saldo do dia</TableCell>
            <TableCell align="center">Entradas</TableCell>
            <TableCell align="center">Saídas</TableCell>
            <TableCell align="center">Lançamentos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ||
            Array.from(mappedTransactions.values()).map(
              (transaction, key) => (
                <TransactionRow key={key} transactions={transaction} />
              )
            )}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CashFlowTable;

const styles = {
  emptyTableCell: {
    backgroundColor: "white !important",
  },
};