import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {CircularProgress, Stack, Typography} from "@mui/material";
import { TransactionDAO } from "@/types/entities";
import { getTransactions } from "@/lib/supabase/methods/transactions";
import {
  amountFormatter,
  getFisrtDayOfMonth,
  getLasDayOfMonth,
  groupTransactionsByDate,
} from "@/lib/functions";
import TransactionRow from "@/components/dashboard/tables/TransactionRow";
import { useQuery } from "@tanstack/react-query";

const ListTransactionsTable = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(getFisrtDayOfMonth(), getLasDayOfMonth()),
  });

  const getMappedTransactions = () => {
    return groupTransactionsByDate(transactions as TransactionDAO[]);
  };

  const getIncomeTotal = () => {
    // @ts-ignore
    return transactions
      ?.filter((transaction: any) => transaction.categories.type === "Receita")
      .map((transaction: any) => transaction.payed_amount)
      .reduce((acc: number, curr: number) => acc + curr, 0) ?? 0;
  }

  const getExpenseTotal = () => {
    // @ts-ignore
    return transactions
      ?.filter((transaction: any) => transaction.categories.type !== "Receita")
      .map((transaction: any) => transaction.payed_amount)
      .reduce((acc: number, curr: number) => acc + curr, 0) ?? 0;
  }

  return (

      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* TODO: convert to styled component */}
              <TableCell colSpan={4} sx={{backgroundColor: "white !important"}} />
              <TableCell align="center" sx={{backgroundColor: "white !important"}} >
                <Typography fontWeight="bold" color="info.main">
                  {amountFormatter(getIncomeTotal())}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{backgroundColor: "white !important"}} >
                <Typography fontWeight="bold" color="secondary.main">
                  {amountFormatter(getExpenseTotal())}
                </Typography>
              </TableCell>
              <TableCell sx={{backgroundColor: "white !important"}} />
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
              Array.from(getMappedTransactions().values()).map(
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

export default ListTransactionsTable;
