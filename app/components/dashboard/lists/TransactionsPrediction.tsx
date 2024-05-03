import React from "react";
import Stack from "@mui/material/Stack";
import { PaperContainer, TransactionListItem } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import dayjs from "dayjs";
import { getFutureTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import { amountFormatter } from "@/app/lib/functions";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TransactionActionButtons from "../buttons/TransactionActionButtons";

async function fetchFutureTransactions() {
  const tomorrow = dayjs().format("YYYY-MM-DD");
  const limit = dayjs().add(1, "month").format("YYYY-MM-DD");
  const res = await getFutureTransactions(tomorrow, limit);
  return res as TransactionType[];
}

const TransactionsPrediction = async () => {
  const transactions = await fetchFutureTransactions();

  return (
    <PaperContainer>
      <PaperHeader title="Próximos lançamentos" />
      <Stack>
        {transactions.map((transaction) => (
          <TransactionListItem>
            <Box sx={{width: "40px"}}>
              <Typography variant="subtitle1">{dayjs(transaction.due_date).format("DD")}</Typography>
            </Box>
            <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{transaction.categories?.name}</Typography>
              <Typography variant="body2">{transaction.description}</Typography>
            </Stack>
            <Box sx={{ pr: "14px" }}>
              <Typography variant="body1" color={transaction.categories?.type == "Receita" ? "success.dark" : "error.dark"}>
                {amountFormatter(transaction.payments?.amount ?? transaction.amount)}
              </Typography>
            </Box>
            <Stack direction="row" justifyContent="end">
              <TransactionActionButtons transaction={transaction} />
            </Stack>
          </TransactionListItem>
        ))}
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPrediction;
