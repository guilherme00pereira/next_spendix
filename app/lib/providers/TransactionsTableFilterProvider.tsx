'use client'
import React from 'react';
import { TransactionType } from "@/types/entities";
import { TransactionsTableFilterContext } from '../contexts';

const TransactionsTableFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [filteredTransactions, setFilteredTransactions] = React.useState<TransactionType[]>([]);
    return (
        <TransactionsTableFilterContext.Provider 
            value={{
                filteredTransactions,
                setFilteredTransactions,
            }}>
            {children}
        </TransactionsTableFilterContext.Provider>
    );
};

export default TransactionsTableFilterProvider;