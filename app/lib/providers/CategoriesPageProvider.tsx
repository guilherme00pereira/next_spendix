"use client";
import React, { useState } from "react";
import { CategoriesPageContext } from "../contexts";
import { TransactionType } from "@/types/entities";

const CategoriesPageProvider = ({ children }: { children: React.ReactNode }) => {
    const [showCategoriesChart, setShowCategoriesChart] = useState(true);
    const [showCategoryTotalsChart, setShowCategoryTotalsChart] = useState(false);
    const [transactions, setTransactions] = useState([] as TransactionType[])

    return (
        <CategoriesPageContext.Provider value={{
            showCategoriesChart,
            setShowCategoriesChart,
            showCategoryTotalsChart,
            setShowCategoryTotalsChart,
            transactions,
            setTransactions
        }}>
            {children}
        </CategoriesPageContext.Provider>
    );
};

export default CategoriesPageProvider;