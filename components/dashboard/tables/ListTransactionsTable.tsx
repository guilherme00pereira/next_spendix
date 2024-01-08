import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CircularProgress,} from "@mui/material";
import {TransactionDAO} from "@/types/entities";
import {getTransactions} from "@/lib/supabase/methods/transactions";
import {getFisrtDayOfMonth, getLasDayOfMonth, groupTransactionsByDate} from "@/lib/functions";
import TransactionRow from "@/components/dashboard/tables/TransactionRow";
import {TransactionContext, usePageContext} from "@/lib/hooks";


const ListTransactionsTable = () => {
    const {updateTable} = usePageContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<TransactionDAO[]>([]);

    useEffect(() => {
        try {
            const di = getFisrtDayOfMonth();
            const df = getLasDayOfMonth();
            getTransactions(di, df).then((data) => {
                setTransactions(data as TransactionDAO[]);
                setLoading(false);
            });
        } catch (error) {
            console.error(error);
        }
    }, [updateTable]);

    const getMappedTransactions = () => {
        return groupTransactionsByDate(transactions);
    }

    return (
        <TransactionContext.Provider value={[]}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="center">Dia</TableCell>
                            <TableCell align="center">Balanço</TableCell>
                            <TableCell align="center">Saldo do dia</TableCell>
                            <TableCell align="center">Entradas</TableCell>
                            <TableCell align="center">Saídas</TableCell>
                            <TableCell align="center">Lançamentos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading || Array.from(getMappedTransactions().values()).map((transaction, key) => (
                            <TransactionRow
                                key={key}
                                transactions={transaction}
                            />
                        ))}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress/>
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