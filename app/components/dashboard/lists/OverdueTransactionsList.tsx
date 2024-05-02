import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { getOverdueTransactions } from "@/app/lib/supabase/methods/transactions";
import OverdueTransactionsListItem from "./items/OverdueTransactionListItem";

async function fetchOverdueTransactions() {
  return await getOverdueTransactions();
}

const OverdueTransactionsList = async () => {
  const transactions = await fetchOverdueTransactions();

  return (
    <PaperContainer>
      <PaperHeader
        title="Contas em atraso"
        link={{
          show: true,
          text: "Ver todas",
          target: "/dashboard/transactions/overdue",
        }}
        badge={{
          show: true,
          content: transactions.length ?? 10,
          color: "error",
        }}

      />
      {transactions &&
        transactions
        .slice(0, 10)
          .filter((t) => t.categories?.type == "Despesa")
          .map((transaction: any, index: number) => (
            <OverdueTransactionsListItem
              key={index}
              transaction={transaction}
            />
          ))}
    </PaperContainer>
  );
};

export default OverdueTransactionsList;
