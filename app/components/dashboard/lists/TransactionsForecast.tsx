import React from "react";
import Stack from "@mui/material/Stack";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import dayjs from "dayjs";
import { getFutureTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import ForecastedTransactionListItem from "./items/ForecastedTransactionListItem";

async function fetchFutureTransactions() {
  const tomorrow = dayjs().format("YYYY-MM-DD");
  const limit = dayjs().add(1, "month").format("YYYY-MM-DD");
  const res = await getFutureTransactions(tomorrow, limit);
  return res as TransactionType[];
}

const TransactionsForecast = async () => {
  const transactions = await fetchFutureTransactions();

  return (
    <PaperContainer>
      <PaperHeader 
        title="Próximos lançamentos"
        link={{
          show: true,
          text: "Ver todos",
          target: "/dashboard/transactions/forecast",
        }}
         />
      <Stack>
        {transactions.slice(0, 6).map((transaction) => (
          <ForecastedTransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsForecast;
