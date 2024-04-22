import React, { useEffect, useMemo, useState } from "react";
import {PaperContainer, TransactionListItem} from "@/components/dashboard/commonStyledComponents";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { TransactionType } from "@/types/entities";
import { amountFormatter, groupTransactionsByDate } from "@/lib/functions";
import SelectDayOfMonth from "@/components/dashboard/calendar/SelectDayOfMonth";
import TransactionPerDayListItem from "./items/TransactionPerDayListItem";
import Typography from "@mui/material/Typography";

const TransactionsPerDayList = ({transactions}: {transactions: TransactionType[]}) => {
  const [mappedTransactions, setMappedTransactions] = useState<
    Map<string, TransactionType[]>
  >(new Map());
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
      const lista = transactions.filter(
        (transaction: any) => transaction.categories.id != 43
      );
      setMappedTransactions(
        groupTransactionsByDate(lista as TransactionType[])
      );
  }, []);

  const transactionsDay = useMemo(() => {
    return mappedTransactions.get(selectedDate) ?? [];
  }, [selectedDate, mappedTransactions]);

  return (
    <PaperContainer>
      <PaperHeader title="Transações por dia" showLink linkText="Ver todas" linkTo="/dashboard/transactions/all" />
      <Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <SelectDayOfMonth
            days={Array.from(mappedTransactions.keys())}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        {transactionsDay.map((transaction, index) => (
          <TransactionPerDayListItem key={index} transaction={transaction} />
        ))}
        <TransactionListItem>
          <Typography variant="body1" fontWeight={600}>TOTAL:</Typography>
          <Typography variant="subtitle1" fontWeight={900} color="error">
            {amountFormatter(
              transactionsDay.reduce((acc, curr) => acc + curr.amount, 0)
            )}
          </Typography>
        </TransactionListItem>
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPerDayList;