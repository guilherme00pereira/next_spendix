import React, { useEffect } from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import {CircularProgress, Stack, Typography} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsByCategory } from '@/lib/supabase/methods/transactions';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
    getFisrtDayOfMonth,
    getLasDayOfMonth,
    amountFormatter,
  } from "@/lib/functions";
import { SinglePageTableProps } from '@/types/interfaces';
import { TransactionDAO } from '@/types/entities';

const ListTransactionsByCategoryTable = ({id, handleName, handleType}: SinglePageTableProps) => {
    const [total, setTotal] = React.useState<number>(0);

    const { data: transactions, isLoading } = useQuery({
        queryKey: ["category-transactions"],
        queryFn: () => getTransactionsByCategory(getFisrtDayOfMonth(), getLasDayOfMonth(), id),
      });

      useEffect(() => {
        const firstTransaction: TransactionDAO = transactions?.[0] as TransactionDAO ?? {}
        handleName(firstTransaction.categories?.name ?? "")
        handleType(firstTransaction.categories?.type ?? "")
        setTotal(transactions?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0)
      }, [transactions])

    return (
        <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                <TableRow
                                    key={transaction.id}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell align="center" scope="row">
                                        {transaction.due_date.substring(8, 10)}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        <Stack direction="row" justifyContent="space-around">
                                            <Typography variant="body2">
                                                {amountFormatter(transaction.amount)}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        <Typography variant="body2" color={transaction.cashed ? "success.main" : "error.main"}>
                                            {transaction.cashed && <CheckCircleOutlineRoundedIcon/>}
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
                                    <Typography fontWeight="bold">
                                        Total
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography fontWeight="bold">
                                        {amountFormatter(total)}
                                    </Typography>
                                </TableCell>
                                <TableCell colSpan={2} />
                            </TableRow>
                            {isLoading && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress/>
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
    );
};

export default ListTransactionsByCategoryTable;