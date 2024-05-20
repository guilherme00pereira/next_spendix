import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import OverdueTransactionRow from "@/app/components/dashboard/tables/rows/OverdueTransactionRow";
import { getOverdueTransactions } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import PaperHeaderBadge from "@/app/components/dashboard/widgets/paper-header/PaperHeaderBadge";
import Stack from "@mui/material/Stack";

const OverdueTransactions = async () => {
  const transactions = (await getOverdueTransactions()) as TransactionType[];
  return (
    <PageContainer title="Lista de Transações do mês">
      <PaperContainer>
        <PaperHeader title="Transações">
          <Stack direction="row" alignItems="center" width="100%">
          <PaperHeaderBadge content={transactions.length ?? 10} color="error" />
          </Stack>
        </PaperHeader>
        {transactions && (
          <TransactionsTable>
            {transactions &&
              transactions.map((transaction: any) => (
                <OverdueTransactionRow key={transaction.id} transaction={transaction} />
              ))}
          </TransactionsTable>
        )}
      </PaperContainer>
    </PageContainer>
  );
};

export default OverdueTransactions;
