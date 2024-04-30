'use client'
import { useMemo } from "react";
import Typography from "@mui/material/Typography";
import { TransactionListItem } from "@/app/components/dashboard/commonStyledComponents";
import { amountFormatter } from "@/app/lib/functions";
import { useTransactionsPerDayContext } from "@/app/lib/contexts";

const TransactionsPerDayBalanceListItem = () => {
  const { dailyTransactions } = useTransactionsPerDayContext();

  const dayBalance = useMemo(() => {
    return dailyTransactions.reduce((acc, curr) => {
      const v = curr.payments?.amount ?? curr.amount;
      return curr.categories?.type == "Receita" ? acc + v : acc - v;
    }, 0);
  }, [dailyTransactions]);

  return (
    <TransactionListItem>
      <Typography variant="body1" fontWeight={600}>
        Saldo:
      </Typography>
      <Typography variant="body1" fontWeight={700}>
        {amountFormatter(dayBalance)}
      </Typography>
    </TransactionListItem>
  );
};

export default TransactionsPerDayBalanceListItem;
