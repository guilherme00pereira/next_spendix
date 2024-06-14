import React from "react";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { Stack } from "@mui/material";

export interface ITransactionTopPageInfoProps {
  income: number;
  paid: number;
  spendings: number;
  mean: number;
}

const TransactionTopPageInfo = ({ income, paid, spendings, mean }: ITransactionTopPageInfoProps) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="start" flexWrap="wrap" width={{xs: "100%", md: "50%"}} spacing={{xs: 2, md: 0}}>
      <TransactionsTotalsWidget value={income} title="Total de receitas" income={true} color="success" />
      <TransactionsTotalsWidget value={paid} title="Total pago" income={false} color="warning" />
      <TransactionsTotalsWidget value={mean} title="Média por dia" income={true} color="warning" />
      <TransactionsTotalsWidget value={income - paid} title="Saldo" income={true} color="info" />
      <TransactionsTotalsWidget value={spendings} title="Despesas totais previstas" income={false} color="error" />
    </Stack>
  );
};

export default TransactionTopPageInfo;
