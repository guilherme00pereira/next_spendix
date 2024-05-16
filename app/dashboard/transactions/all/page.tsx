import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import TransactionRow from "@/app/components/dashboard/tables/rows/TransactionRow";

const AllTransactions = async () => {
  const transactions = await getTransactions(
    dayjs().startOf("M").format("YYYY-MM-DD"),
    dayjs().endOf("M").format("YYYY-MM-DD")
  );

  return (
    <PageContainer title="Lista de Transações do mês">
      <PaperContainer>
        <PaperHeader title="Transações" />
        <TransactionsTable>
          {transactions &&
            transactions.map((transaction: any) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
        </TransactionsTable>
      </PaperContainer>
    </PageContainer>
  );
};

export default AllTransactions;
