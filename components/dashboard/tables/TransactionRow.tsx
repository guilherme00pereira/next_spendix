import {useState, useEffect, useRef} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {TransactionDAO, TransactionRow} from "@/types/entities";
import {amountFormatter} from "@/lib/functions";
import TransactionRowData from "@/components/dashboard/tables/TransactionRowData";
import {Typography} from "@mui/material";
import {useTransactionContext} from "@/lib/hooks";

const getBalanceColor = (balance: number) => {
    if (balance < 0) return "error.main";
    if (balance === 0) return "text.primary";
    return "success.main";
}

const TransactionRow = ({transactions}: { transactions: TransactionDAO[]}) => {
    let balanceTotal = useTransactionContext();
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState<TransactionRow>();
    const [balanceMonth, setBalanceMonth] = useState<number>(0);
    const wasAlreadyRequested = useRef(false);

    useEffect(() => {
        const run = async () => {
        const income: number = transactions
            .filter((transaction: TransactionDAO) => transaction.categories.type === "Receita")
            .map((transaction: TransactionDAO) => transaction.amount)
            .reduce((acc: number, curr: number) => acc + curr, 0);
        const expense = transactions
            .filter((transaction: TransactionDAO) => transaction.categories.type !== "Receita")
            .map((transaction: TransactionDAO) => transaction.amount)
            .reduce((acc: number, curr: number) => acc + curr, 0);
        setRow({
            day: transactions[0].date.substring(8),
            income: income,
            expense: expense,
            balance: parseFloat(String((income - expense))),
        });
        balanceTotal.push( parseFloat(String((income - expense).toFixed(2))) )
        setBalanceMonth( balanceTotal.reduce((acc: number, curr: number) => acc + curr, 0) );
        }
        if (!wasAlreadyRequested.current) {
            wasAlreadyRequested.current = true;
            run();
        }
    }, [wasAlreadyRequested]);

    return (
        <>
            {row && (
                <>
                    <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </IconButton>
                        </TableCell>
                        <TableCell align="center">{row.day}</TableCell>

                        <TableCell align="center">
                            <Typography fontWeight="bold" color={getBalanceColor(balanceMonth)}>
                                {amountFormatter(balanceMonth)}
                            </Typography>
                        </TableCell>

                        <TableCell align="center">
                            <Typography color={getBalanceColor(row.balance)}>
                                {amountFormatter(row.balance)}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography color="info.main">
                                {amountFormatter(row.income)}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography color="warning.main">
                                {amountFormatter(row.expense)}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">{transactions.length}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                            <TransactionRowData day={row.day} transactions={transactions} open={open}/>
                        </TableCell>
                    </TableRow>
                </>
            )}
        </>
    );
};

export default TransactionRow;
