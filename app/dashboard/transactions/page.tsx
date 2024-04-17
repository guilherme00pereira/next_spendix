"use client";
import { useState } from "react";
import { TransactionContext } from "@/lib/hooks";
import { TransactionType } from "@/types/entities";
import PageContainer from "@/components/dashboard/page/PageContainer";
import Masonry from '@mui/lab/Masonry';
import TransactionsByDueDayList from "@/components/dashboard/lists/TransactionsByDueDayDataList";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        list: transactions,
        setList: setTransactions,
      }}
    >
      <PageContainer title="Transações">
        <Masonry columns={2} spacing={2}>
          <TransactionsByDueDayList />
        </Masonry>
      </PageContainer>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;
