"use client";
import { useState } from "react";
import { TransactionsPerDayContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import dayjs from "dayjs";

const TransactionsPerDayProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDay, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));
  

  return (
    <TransactionsPerDayContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </TransactionsPerDayContext.Provider>
  );
};

export default TransactionsPerDayProvider;
