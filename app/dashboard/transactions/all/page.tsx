"use client";
import { TransactionListItem } from "@/components/dashboard/commonStyledComponents";
import PageContainer from "@/components/dashboard/page/PageContainer";
import { useAppStore } from "@/lib/store";
import { getTransactions } from "@/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

const AllTransactions = () => {
  const date = useAppStore((state) => state.date);

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(
      dayjs(date).startOf("M").format("YYYY-MM-DD"),
      dayjs(date).endOf("M").format("YYYY-MM-DD")
    ).then((data) => {
      return data as TransactionType[];
      }),
  });

  return (
    <PageContainer title="Lista de Transações do mês">
      
      {transactions && transactions.map((transaction, index) => (
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
