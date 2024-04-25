import React from "react";
import Stack from "@mui/material/Stack";
import { TransactionType } from "@/types/entities";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { amountFormatter } from "@/lib/functions";
import { TransactionListItem } from "@/components/dashboard/commonStyledComponents";
import TransactionActionButtons from "../../buttons/TransactionActionButtons";


const TransactionPerDayListItem = ({ transaction }: { transaction: TransactionType }) => {
  
  return (
    <TransactionListItem>
      <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{transaction.categories?.name}</Typography>
        <Typography variant="subtitle2">{transaction.description}</Typography>
      </Stack>
      <Box sx={{pr: "14px"}}>
        <Typography variant="body1" color={transaction.categories?.type == "Receita" ? "success.dark" : "error.dark"}>
          {amountFormatter(transaction.payments?.amount ?? transaction.amount)}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="end">
        <TransactionActionButtons transaction={transaction} />
      </Stack>
    </TransactionListItem>
  );
};

export default TransactionPerDayListItem;
