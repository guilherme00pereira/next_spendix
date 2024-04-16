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
import { useTransactionContext } from "@/lib/hooks";
import { useAppStore } from "@/lib/store";
import dayjs from "dayjs";

const TransactionsTable = () => {
  const { list, setList } = useTransactionContext();
  const date = useAppStore((state) => state.date);
  const [mappedTransactions, setMappedTransactions] = useState<Map<string, TransactionType[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
      setIsLoading(true);
      getTransactions(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs(date).endOf("M").format("YYYY-MM-DD")).then((data) => {
        const lista = data.filter((transaction: any) => transaction.categories.id != 43);
        setList(lista as TransactionType[]);
        setIsLoading(false);
        setMappedTransactions(groupTransactionsByDate(lista as TransactionType[]));
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
            <TableCell colSpan={2} sx={styles.emptyTableCell} />
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
            <TableCell sx={styles.emptyTableCell} />
          </TableRow>
          <TableRow>
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Saldo</TableCell>
            <TableCell align="center">Receitas</TableCell>
            <TableCell align="center">Despesas</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading || Array.from(mappedTransactions.values()).map((transaction, key) => <TransactionRow key={key} transactions={transaction} />)}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;

const styles = {
  emptyTableCell: {
    backgroundColor: "white !important",
  },
};
