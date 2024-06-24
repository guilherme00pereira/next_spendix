"use client";
import React, { useEffect } from "react";
import { TransactionType } from "@/types/entities";
import { amountFormatter } from "@/app/lib/functions";
import { TableRow, TableCell, TableBody, Typography } from "@mui/material";
import dayjs from "dayjs";
import TransactionActionButtons from "@/app/components/dashboard/widgets/buttons/TransactionActionButtons";
import { useAllTransactionsPageContext, useTransactionsTableFilterContext } from "@/app/lib/contexts";
import { RegularLink } from "@/app/components/dashboard/commonStyledComponents";
import { getSimpleTransactionsTotals } from "@/app/lib/helpers";

const TransactionRows = ({ transactions }: { transactions: TransactionType[] }) => {
  const { filteredTransactions } = useTransactionsTableFilterContext();
  const { setTotalIncome, setTotalExpense, setDailyMean } = useAllTransactionsPageContext();

  const transactionsToRender = filteredTransactions.length > 0 ? filteredTransactions : transactions;

  useEffect(() => {
    const [totalIncome, totalExpenses, dailyAverage] = getSimpleTransactionsTotals(transactions)
    setTotalIncome(totalIncome);
    setTotalExpense(totalExpenses);
    setDailyMean(dailyAverage);
  }, [transactionsToRender]);

  return (
    <TableBody>
      {transactionsToRender.length > 0 &&
        transactionsToRender.map((transaction: TransactionType) => (
          <TableRow key={transaction.id}>
            <TableCell align="center">{dayjs(transaction.due_date).format("DD/MM/YYYY")}</TableCell>
            <TableCell>
              <RegularLink
                href={`/dashboard/categories/${transaction.categories?.slug}`}
                underline="none"
                variant="subtitle2"
              >
                {transaction.categories?.name}
              </RegularLink>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="body1"
                color={transaction.categories?.type == "Receita" ? "success.dark" : "error.dark"}
              >
                {transaction.categories?.type == "Receita" ? "+ " : "- "}
                {amountFormatter(transaction.amount)}
              </Typography>
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <TransactionActionButtons transaction={transaction} showDelete />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
};

export default TransactionRows;
