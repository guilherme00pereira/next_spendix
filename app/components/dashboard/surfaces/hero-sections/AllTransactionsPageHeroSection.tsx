import React from "react";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { Stack } from "@mui/material";
import Totals4Columns from "@/app/components/dashboard/surfaces/widgets-papers/Totals4Columns";

export interface ITransactionTopPageInfoProps {
  cashed: number;
  paid: number;
  mean: number;
}

const AllTransactionsPageHeroSection = ({ cashed, paid, mean }: ITransactionTopPageInfoProps) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" width="100%" spacing={2}>
      <Totals4Columns>
        <TransactionsTotalsWidget value={cashed} title="Entradas" income={true} color="success" />
      </Totals4Columns>
      <Totals4Columns>
        <TransactionsTotalsWidget value={paid} title="Saídas" income={false} color="error" />
      </Totals4Columns>
      <Totals4Columns>
        <TransactionsTotalsWidget value={mean} title="Média por dia" income={true} color="warning" />
      </Totals4Columns>
      <Totals4Columns>
        <TransactionsTotalsWidget value={cashed - paid} title="Saldo" income={true} color="info" />
      </Totals4Columns>
    </Stack>
  );
};

export default AllTransactionsPageHeroSection;
