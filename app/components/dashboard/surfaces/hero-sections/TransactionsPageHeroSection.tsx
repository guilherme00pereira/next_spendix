import React from "react";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { Stack } from "@mui/material";
import Totals2Columns from "@/app/components/dashboard/surfaces/widgets-papers/Totals2Columns";

export interface ITransactionTopPageInfoProps {
  cashed: number;
  income: number;
  paid: number;
  spendings: number;
  mean: number;
}

const TransactionsPageHeroSection = ({ cashed, income, paid, spendings, mean }: ITransactionTopPageInfoProps) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      flexWrap="wrap"
      width={{ xs: "100%", md: "50%" }}
      spacing={{ xs: 2, md: 0 }}
    >
      <Totals2Columns>
        <TransactionsTotalsWidget value={cashed} title="Valor recebido" income={true} color="success" />
      </Totals2Columns>
      <Totals2Columns>
        <TransactionsTotalsWidget value={paid} title="Valor pago" income={false} color="warning" />
      </Totals2Columns>
      <Totals2Columns>
        <TransactionsTotalsWidget value={mean} title="Média por dia" income={true} color="warning" />
      </Totals2Columns>
      <Totals2Columns>
      <TransactionsTotalsWidget value={cashed - paid} title="Saldo" income={true} color="info" />
      </Totals2Columns>
      <Totals2Columns>
        <TransactionsTotalsWidget value={income} title="Total de receitas previstas" income={true} color="success" />
      </Totals2Columns>
      <Totals2Columns>
        <TransactionsTotalsWidget value={spendings} title="Despesas totais previstas" income={false} color="error" />
      </Totals2Columns>
    </Stack>
  );
};

export default TransactionsPageHeroSection;
