import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Typography } from "@mui/material";
import { TransactionType } from "@/types/entities";
import { getTransactions } from "@/lib/supabase/methods/transactions";
import { amountFormatter, groupTransactionsByDate } from "@/lib/functions";
import TransactionRow from "@/components/dashboard/tables/TransactionRow";
import { useTransactionContext, useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";

const ListTransactionsTable = () => {
  const { list, setList } = useTransactionContext();
  const { date } = useAppStore();
  const [mappedTransactions, setMappedTransactions] = useState<Map<string, TransactionType[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setIsLoading(true);
      getTransactions(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")).then((data) => {
        setList(data as TransactionType[]);
        setIsLoading(false);
        setMappedTransactions(groupTransactionsByDate(data as TransactionType[]));
      });
  }, [date]);

  const getIncomeTotal = () => {
    return (
      list
        ?.filter((transaction: any) => transaction.categories.type === "Receita")
        .map((transaction: any) => transaction.amount)
        .reduce((acc: number, curr: number) => acc + curr, 0) ?? 0
    );
  };

  const getExpenseTotal = () => {
    return (
      list
        ?.filter((transaction: any) => transaction.categories.type !== "Receita")
        .map((transaction: any) => transaction.amount)
        .reduce((acc: number, curr: number) => acc + curr, 0) ?? 0
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} sx={styles.emptyTableCell} />
            <TableCell align="center" sx={styles.emptyTableCell}>
              <Typography fontWeight="bold" color="info.main">
                {amountFormatter(getIncomeTotal())}
              </Typography>
            </TableCell>
            <TableCell align="center" sx={styles.emptyTableCell}>
              <Typography fontWeight="bold" color="secondary.main">
                {amountFormatter(getExpenseTotal())}
              </Typography>
            </TableCell>
            <TableCell colSpan={2} sx={styles.emptyTableCell} />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Saldo</TableCell>
            <TableCell align="center">Receitas</TableCell>
            <TableCell align="center">Despesas</TableCell>
            <TableCell align="center">N° de Lançamentos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading || Array.from(mappedTransactions.values()).map((transaction, key) => <TransactionRow key={key} transactions={transaction} />)}
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

export default ListTransactionsTable;

const styles = {
  emptyTableCell: {
    backgroundColor: "white !important",
  },
};
