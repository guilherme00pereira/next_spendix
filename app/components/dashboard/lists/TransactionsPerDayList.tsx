import React, { useEffect, useMemo, useState } from "react";
import {
  PaperContainer,
  TransactionListItem,
} from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { getPayedTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import { amountFormatter, groupTransactionsByDate } from "@/app/lib/functions";
import SelectDayOfMonth from "@/app/components/dashboard/calendar/SelectDayOfMonth";
import TransactionPerDayListItem from "./items/TransactionPerDayListItem";

async function fetchTransactions() {
  const res = await getPayedTransactions(dayjs().startOf("M").format("YYYY-MM-DD"), dayjs().endOf("M").format("YYYY-MM-DD"))
  const filtered = res.filter(
    (transaction: any) => transaction.categories.id != 43
  );
  return filtered;
}

const TransactionsPerDayList = async () => {
  const transactions = await fetchTransactions();
  const mappedTransactions = groupTransactionsByDate(transactions as TransactionType[]);


  // const dayBalance = useMemo(() => {
  //   return transactionsDay.reduce((acc, curr) => {
  //     const v = curr.payments?.amount ?? curr.amount;
  //     return curr.categories?.type == "Receita" ? acc + v : acc - v;
  //   }, 0);
  // }, [transactionsDay]);

  return (
    <PaperContainer sx={{ minHeight: "400px" }}>
      <PaperHeader
        title="Transações por dia"
        link={{
          show: true,
          text: "Ver todas",
          target: "/dashboard/transactions/all",
        }}
      />
      <Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <SelectDayOfMonth
            transactions={mappedTransactions}
          />
        </Stack>
        {/* {transactionsDay.map((transaction, index) => (
          <TransactionPerDayListItem key={index} transaction={transaction} />
        ))} */}
        {/* <TransactionListItem>
          <Typography variant="body1" fontWeight={600}>
            Saldo:
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {amountFormatter(dayBalance)}
          </Typography>
        </TransactionListItem> */}
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPerDayList;
