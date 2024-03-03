import {useState, useEffect, useRef} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {TransactionType, TransactionRow} from "@/types/entities";
import {amountFormatter} from "@/lib/functions";
import TransactionRowData from "@/components/dashboard/tables/TransactionRowData";
import {Chip, Typography} from "@mui/material";
import {useTransactionContext} from "@/lib/hooks";

const getBalanceColor = (balance: number) => {
    if (balance < 0) return "error.main";
    if (balance === 0) return "text.primary";
    return "success.main";
}

const TransactionRow = ({transactions}: { transactions: TransactionType[]}) => {
    let {balanceTotal} = useTransactionContext();
    const [open, setOpen] = useState(true);
    const [row, setRow] = useState<TransactionRow>();
    const wasAlreadyRequested = useRef(false);

    useEffect(() => {
        const run = async () => {
        const income: number = transactions
            .filter((transaction: TransactionType) => transaction.categories?.type === "Receita")
            .map((transaction: TransactionType) => transaction.amount)
            .reduce((acc: number, curr: number) => acc + curr, 0);
        const expense = transactions
            .filter((transaction: TransactionType) => transaction.categories?.type !== "Receita")
            .map((transaction: TransactionType) => transaction.amount)
            .reduce((acc: number, curr: number) => acc + curr, 0);
        setRow({
            day: transactions[0].due_date.substring(8) ?? "0",
            income: income,
            expense: expense,
            balance: parseFloat(String((income - expense))),
        });
        balanceTotal.push( parseFloat(String((income - expense).toFixed(2))) )
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
                    <TableRow key={row.day}>
                        <TableCell align="center">
                            <Chip label={row.day} sx={{backgroundColor: (theme: any) => theme.palette.primary.lightest}} />
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
                            <Typography color="secondary.main">
                                {amountFormatter(row.expense)}
                            </Typography>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              color="primary"
                              onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{backgroundColor: (theme: any) => theme.palette.info.lightest}}>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <TransactionRowData day={row.day} transactions={transactions} open={open}/>
                        </TableCell>
                    </TableRow>
                </>
            )}
        </>
    );
};

export default TransactionRow;
