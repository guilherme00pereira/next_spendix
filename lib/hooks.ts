import {createContext, useContext} from "react";
import {PageContextData} from "@/types/interfaces";


export const PageContext = createContext<PageContextData>({} as PageContextData);
export const TransactionContext = createContext<number[]>([]);

export const usePageContext = () => {
    const context = useContext(PageContext);
    if(!context) {
        throw new Error("usePageContext must be used within a PageContextProvider");
    }
    return context;
}

export const useTransactionContext = () => {
    const context = useContext(TransactionContext);
    if(!context) {
        throw new Error("useTransactionContext must be used within a TransactionContextProvider");
    }
    return context;
}