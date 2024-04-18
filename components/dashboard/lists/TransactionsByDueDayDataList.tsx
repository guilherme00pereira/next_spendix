import React, {useEffect, useMemo, useState} from 'react';
import {PaperContainer} from '@/components/common-styled';
import PaperHeader from '@/components/dashboard/surfaces/PaperHeader';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {getTransactions} from "@/lib/supabase/methods/transactions";
import dayjs from "dayjs";
import {TransactionType} from "@/types/entities";
import {useAppStore} from "@/lib/store";
import {groupTransactionsByDate} from "@/lib/functions";
import SelectDayOfMonth from "@/components/dashboard/calendar/SelectDayOfMonth";

const TransactionsByDueDayList = () => {
  const date = useAppStore((state) => state.date);
  const [mappedTransactions, setMappedTransactions] = useState<Map<string, TransactionType[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    setIsLoading(true);
    getTransactions(dayjs(date).startOf("M").format("YYYY-MM-DD"), dayjs(date).endOf("M").format("YYYY-MM-DD")).then((data) => {
      const lista = data.filter((transaction: any) => transaction.categories.id != 43);
      setMappedTransactions(groupTransactionsByDate(lista as TransactionType[]));
    });
    setIsLoading(false);
  }, []);

  
  const transactionsDay = useMemo(() => {
    return mappedTransactions.get(selectedDate) ?? [];
  }, [selectedDate, mappedTransactions]);


  return (
    <PaperContainer>
      <PaperHeader title='Transações por dia'/>
      <Stack>
        <Stack justifyContent="center">
          <SelectDayOfMonth days={Array.from(mappedTransactions.keys())} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </Stack>
        {transactionsDay.map((transaction, index) => (
          <div key={index}>
              {transaction.due_date}
              <p>{transaction.amount} - {transaction.categories?.name}</p>
              <p>{transaction.description}</p>
          </div>
        ))}
        {isLoading && <div>carregando...</div>}
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsByDueDayList;