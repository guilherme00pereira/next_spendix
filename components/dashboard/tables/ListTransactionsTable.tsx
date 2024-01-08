import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import { TransactionDAO } from "@/types/entities";
import { getTransactions } from "@/lib/supabase/methods/transactions";
import {
  getFisrtDayOfMonth,
  getLasDayOfMonth,
  groupTransactionsByDate,
} from "@/lib/functions";
import TransactionRow from "@/components/dashboard/tables/TransactionRow";
import { TransactionContext } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";

const ListTransactionsTable = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(getFisrtDayOfMonth(), getLasDayOfMonth()),
  });

  const getMappedTransactions = () => {
    return groupTransactionsByDate(transactions as TransactionDAO[]);
  };

  return (
    <TransactionContext.Provider value={[]}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
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
    </TransactionContext.Provider>
  );
};

export default ListTransactionsTable;
