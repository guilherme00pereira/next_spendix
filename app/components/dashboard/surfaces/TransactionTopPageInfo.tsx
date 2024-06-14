import React from "react";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";

export interface ITransactionTopPageInfoProps {
  income: number;
  paid: number;
  spendings: number;
  mean: number;
}

const TransactionTopPageInfo = ({ income, paid, spendings, mean }: ITransactionTopPageInfoProps) => {
  return (
    <>
      <TransactionsTotalsWidget value={income} title="Total de receitas" income={true} color="success" first />
      <TransactionsTotalsWidget value={paid} title="Total pago" income={false} color="warning" />
      <TransactionsTotalsWidget value={mean} title="Média por dia" income={true} color="warning" />
      <TransactionsTotalsWidget value={income - paid} title="Saldo" income={true} color="info" />
      <TransactionsTotalsWidget value={spendings} title="Despesas totais no mês" income={false} color="error" />
    </>
  );
};

export default TransactionTopPageInfo;
