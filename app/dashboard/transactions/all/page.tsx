import { TransactionListItem } from "@/app/components/dashboard/commonStyledComponents";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import React from "react";

const AllTransactions = async () => {
  const transactions = await getTransactions(
    dayjs().startOf("M").format("YYYY-MM-DD"),
    dayjs().endOf("M").format("YYYY-MM-DD")
  );

  return (
    <PageContainer title="Lista de Transações do mês">
      {transactions &&
        transactions.map((transaction, index) => (
          <TransactionListItem key={index}>
            <div>{transaction.due_date}</div>
            <div>{transaction.categories?.name}</div>
            <div>{transaction.description}</div>
            <div>{transaction.amount}</div>
          </TransactionListItem>
        ))}
    </PageContainer>
  );
};

export default AllTransactions;
