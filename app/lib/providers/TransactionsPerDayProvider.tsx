"use client";
import { useState } from "react";
import { TransactionsPerDayContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";

const TransactionsPerDayProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [dailyTransactions, setDailyTransactions] = useState([] as TransactionType[]);
  

  return (
    <TransactionsPerDayContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
        dailyTransactions,
        setDailyTransactions,
      }}
    >
      {children}
    </TransactionsPerDayContext.Provider>
  );
};

export default TransactionsPerDayProvider;
