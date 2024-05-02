import React from 'react';
import Stack from "@mui/material/Stack";
import {PaperContainer} from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import dayjs from 'dayjs';
import { getFutureTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from '@/types/entities';

async function fetchFutureTransactions() {
  const tomorrow = dayjs().add(1, 'day').format("YYYY-MM-DD")
  const limit = dayjs().add(1, 'month').format("YYYY-MM-DD")
  const res = await getFutureTransactions(tomorrow, limit);
  return res as TransactionType[];
}

const TransactionsPrediction = async () => {
  const transactions = await fetchFutureTransactions();

  return (
    <PaperContainer>
      <PaperHeader title='Próximas transações'/>
      <Stack>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          {transaction.amount}
        </div>
      ))}      
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPrediction;