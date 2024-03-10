import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { amountFormatter } from '@/lib/functions';
import {TransactionType} from "@/types/entities";

const CategoryDetailsTable = ({transactions}: {transactions: TransactionType[]}) => {
    return (
        <TableContainer sx={{maxHeight: "70vh"}}>
            <Table stickyHeader size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Descrição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction: any) => (
                            <TableRow key={transaction.id}>
                                <TableCell>
                                    {transaction.due_date}
                                </TableCell>
                                <TableCell>
                                    {amountFormatter(transaction.amount)}
                                </TableCell>
                                <TableCell>
                                    {transaction.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </TableContainer>
    );
};

export default CategoryDetailsTable;