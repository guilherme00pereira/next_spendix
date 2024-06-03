import React from "react";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { ITransactionTopPageInfoProps } from "@/types/interfaces";

const TransactionTopPageInfo = ({ income, paid, spendings }: ITransactionTopPageInfoProps) => {
  return (
    <>
      <TransactionsTotalsWidget value={income} title="Total de receitas" income={true} color="success" />
      <TransactionsTotalsWidget value={paid} title="Total pago" income={false} color="warning" />
      <TransactionsTotalsWidget value={spendings} title="Total de despesas" income={false} color="error" />
      <TransactionsTotalsWidget value={income - spendings} title="Saldo" income={true} color="info" />
    </>
  );
};

export default TransactionTopPageInfo;
