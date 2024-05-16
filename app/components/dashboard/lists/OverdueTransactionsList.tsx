import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { getOverdueTransactions } from "@/app/lib/supabase/methods/transactions";
import OverdueTransactionsListItem from "./items/OverdueTransactionListItem";
import PaperHeaderLink from "../elements/paper-header/PaperHeaderLink";
import PaperHeaderBadge from "../elements/paper-header/PaperHeaderBadge";
import { Stack } from "@mui/system";

const OverdueTransactionsList = async () => {
  const transactions = await getOverdueTransactions();

  return (
    <PaperContainer>
      <PaperHeader title="Contas em atraso">
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <PaperHeaderBadge content={transactions.length ?? 10} color="error" />
        <PaperHeaderLink text="Ver todas" target="/dashboard/transactions/overdue" />
        </Stack>
      </PaperHeader>
      {transactions &&
        transactions
          .slice(0, 6)
          .filter((t) => t.categories?.type == "Despesa")
          .map((transaction: any, index: number) => <OverdueTransactionsListItem key={index} transaction={transaction} />)}
    </PaperContainer>
  );
};

export default OverdueTransactionsList;
