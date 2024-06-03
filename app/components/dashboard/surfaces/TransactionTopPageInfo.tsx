import React from "react";
import Stack from "@mui/material/Stack";
import SelectMonthYear from "@/app/components/dashboard/calendar/SelectMonthYear";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { ITransactionTopPageInfoProps } from "@/types/interfaces";

const TransactionTopPageInfo = ({ income, spendings }: ITransactionTopPageInfoProps) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1} width="100%">
      <SelectMonthYear />
      <TransactionsTotalsWidget value={income} title="Total de receitas" income={true} color="success.dark" />
      <TransactionsTotalsWidget value={spendings} title="Total de gastos" income={false} color="error.dark" />
      <TransactionsTotalsWidget value={spendings} title="Total de gastos" income={false} color="error.dark" />
      <TransactionsTotalsWidget value={income - spendings} title="Saldo" income={true} color="text.primary" />
    </Stack>
  );
};

export default TransactionTopPageInfo;
