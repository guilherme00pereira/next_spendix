import React from 'react';
import { TransactionListItem } from "@/app/components/dashboard/commonStyledComponents";
import { amountFormatter } from "@/app/lib/functions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TransactionActionButtons from "@/app/components/dashboard/elements/TransactionActionButtons";
import { TransactionType } from '@/types/entities';
import dayjs from "dayjs";

const getForecastDays = (date: string) => {
    const forecast = dayjs(date).diff(dayjs(), 'd');
    let color = "info.dark";
    if(forecast > 30) color = "error.main";
    if(forecast > 15 && forecast <= 30) color = "warning.dark";
    return (
      <Typography variant="body2" color={color}>
        {forecast} {forecast == 1 ? "dia" : "dias"}
      </Typography>
    );
  };

const ForecastedTransactionListItem = ({transaction}: {transaction: TransactionType}) => {
    return (
        <TransactionListItem>
            <Box sx={{ pr: "24px" }}>
              <Typography variant="body2" sx={{pr: "14px"}}>  
                {dayjs(transaction.due_date).format("DD/MM")}
                </Typography>
                {getForecastDays(transaction.due_date)}
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
    );
};

export default ForecastedTransactionListItem;