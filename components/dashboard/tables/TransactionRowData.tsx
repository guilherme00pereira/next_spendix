import React from 'react';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Collapse from '@mui/material/Collapse';
import {Button, Stack, Typography} from "@mui/material";
import {amountFormatter} from "@/lib/functions";
import Tooltip from "@mui/material/Tooltip";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TableContainer from "@mui/material/TableContainer";
import {removeTransaction, updateTransactionCashedStatus} from "@/lib/supabase/methods/transactions";
import {TransactionDAO} from "@/types/entities";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import {usePageContext} from "@/lib/hooks";
import {TransactionRowDataProps} from "@/types/interfaces";

const getAmountType = (type: string | null) => {
    switch (type) {
        case "Receita":
            return <AddCircleRoundedIcon fontSize="small" color="success"/>;
        default:
            return <RemoveCircleRoundedIcon fontSize="small" color="error"/>
    }
}

const getCategoryColor = (type: string | null) => {
    switch (type) {
        case "Receita":
            return (
                <Typography
                    variant="body2"
                    color="success.main">
                    Receita
                </Typography>
            );
        case "Despesa Fixa":
            return (
                <Typography
                    variant="body2"
                    color="secondary.main">
                    Fixa
                </Typography>
            );
        default:
            return (
                <Typography
                    variant="body2"
                    color="warning.main">
                    Variável
                </Typography>
            );
    }
}

const TransactionRowData = ({day, transactions, open}: TransactionRowDataProps) => {
    const {actionShowModal, actionUpdateTable} = usePageContext();

    const markAsCashed = (id: number) => {
        updateTransactionCashedStatus(id).then(() => {
            actionUpdateTable(true);
        });
    }

    const deleteTransaction = (id: number) => {
        removeTransaction(id).then(() => {
            actionUpdateTable(true);
        });
    }

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Dia {day}</TableCell>
                                <TableCell align="center">Valor</TableCell>
                                <TableCell align="center">Categoria</TableCell>
                                <TableCell align="center">Tipo</TableCell>
                                <TableCell align="center">Descrição</TableCell>
                                <TableCell align="center">Ação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell align="right">
                                        {getAmountType(transaction.categories.type)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Stack direction="row" justifyContent="space-around">
                                            <Typography variant="body2" fontWeight="bold">
                                                {amountFormatter(transaction.amount)}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {transaction.categories.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {getCategoryColor(transaction.categories.type)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body2" color="text.secondary">
                                            {transaction.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        {transaction.cashed || (
                                            <Tooltip title="Marcar como pago" arrow>
                                                <Button size="small" variant="text" color="success"
                                                        onClick={() => markAsCashed(transaction.id)}>
                                                    <CheckRoundedIcon fontSize="small"/>
                                                </Button>
                                            </Tooltip>
                                        )}
                                        <Button size="small" variant="text" color="info"
                                                onClick={() => actionShowModal(true)}>
                                            <EditRoundedIcon fontSize="small"/>
                                        </Button>
                                        <Button size="small" variant="text" color="error" onClick={() => deleteTransaction(transaction.id)}>
                                            <DeleteRoundedIcon fontSize="small"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Collapse>
    );
};

export default TransactionRowData;