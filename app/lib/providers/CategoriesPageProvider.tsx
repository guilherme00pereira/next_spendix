"use client";
import React, { useState } from "react";
import { CategoriesPageContext } from "../contexts";

const CategoriesPageProvider = ({ children }: { children: React.ReactNode }) => {
    const [showChart, setShowChart] = useState(true);

    return (
        <CategoriesPageContext.Provider value={{
            showCategoriesChart: showChart,
            setShowCategoriesChart: setShowChart,
        }}>
            {children}
        </CategoriesPageContext.Provider>
    );
};

export default CategoriesPageProvider;