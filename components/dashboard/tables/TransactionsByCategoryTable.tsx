import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { getTransactionsByCategory } from "@/lib/supabase/methods/transactions";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { amountFormatter } from "@/lib/functions";
import { useAppStore } from "@/lib/hooks";
import dayjs from "dayjs";
import { TransactionType } from "@/types/entities";
import { ICategoriesPanelProps } from "@/types/interfaces";

const CategoryTransactionsPanel = ({ id, action }: ICategoriesPanelProps) => {
  const [total, setTotal] = useState<number>(0);
  const { date } = useAppStore();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTransactionsByCategory(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs(date).endOf("M").format("YYYY-MM-DD"), id).then((data) => {
      setTransactions(data as TransactionType[]);
      setIsLoading(false);
      setTotal(transactions?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0);
    });
  }, [id]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pb: 2 }}>
        <Typography variant="h6" textAlign="center">
          Transações
        </Typography>
      
        <IconButton edge="end" onClick={() => action(0)} aria-label="close" sx={{ p: 0 }}>
          <CloseIcon />
        </IconButton>
      
      </Stack>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Dia</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Pago?</TableCell>
              <TableCell align="center">Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" scope="row">
                  {transaction.due_date.substring(8, 10)}
                </TableCell>
                <TableCell align="center" scope="row">
                  <Stack direction="row" justifyContent="space-around">
                    <Typography variant="body2">{amountFormatter(transaction.amount)}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center" scope="row">
                  <Typography variant="body2" color={transaction.cashed ? "success.main" : "error.main"}>
                    {transaction.cashed && <CheckCircleOutlineRoundedIcon />}
                  </Typography>
                </TableCell>
                <TableCell align="center" scope="row">
                  <Typography variant="body2" color="text.secondary">
                    {transaction.description}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center">
                <Typography fontWeight="bold">Total</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">{amountFormatter(total)}</Typography>
              </TableCell>
              <TableCell colSpan={2} />
            </TableRow>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoryTransactionsPanel;
