import React from "react";
import { PaperContainer } from "@/components/dashboard/commonStyledComponents";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import { getOverdueTransactions } from "@/lib/supabase/methods/transactions";
import { useQuery } from "@tanstack/react-query";
import OverdueTransactionsListItem from "./items/OverdueTransactionListItem";

const OverdueTransactionsList = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["overdue_transactions"],
    queryFn: () => getOverdueTransactions(),
  });

  return (
    <PaperContainer>
      <PaperHeader title="Contas em atraso" />
      {transactions &&
        transactions
          .filter((t) => t.categories?.type == "Despesa")
          .map((transaction: any, index: number) => <OverdueTransactionsListItem key={index} transaction={transaction} />)}
    </PaperContainer>
  );
};

export default OverdueTransactionsList;
