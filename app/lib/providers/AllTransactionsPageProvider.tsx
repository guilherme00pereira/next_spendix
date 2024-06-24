'use client'
import React, { useState } from 'react';
import { AllTransactionsPageContext } from '@/app/lib/contexts';

const AllTransactionsPageProvider = ({ children }: { children: React.ReactNode }) => {
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [dailyMean, setDailyMean] = useState<number>(0);

    return (
        <AllTransactionsPageContext.Provider
            value={{
                totalIncome,
                setTotalIncome,
                totalExpense,
                setTotalExpense,
                dailyMean,
                setDailyMean,
            }}
        >
            {children}
        </AllTransactionsPageContext.Provider>
    );
};

export default AllTransactionsPageProvider;