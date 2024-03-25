import { createContext, useContext, useEffect, useState } from "react";
import {
  IPageContextData,
  ITransactionContextData,
  IAppStoreData,
  ISpeedDialStoreData,
  IBankAccountContextData,
  ICreditCardContextData
} from "@/types/interfaces";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";
import { CategoryFormData, RecurringFormData, TransactionFormData, TransferMoneyFormData } from "@/types/entities";

export const PageContext = createContext<IPageContextData>({} as IPageContextData);
export const TransactionContext = createContext<ITransactionContextData>({} as ITransactionContextData);

export const BankAccountContext = createContext<IBankAccountContextData>({} as IBankAccountContextData);

export const CreditCardContext = createContext<ICreditCardContextData>({} as ICreditCardContextData);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionContextProvider");
  }
  return context;
};

export const useBankAccountContext = () => {
  const context = useContext(BankAccountContext);
  if (!context) {
    throw new Error("useBankAccountContext must be used within a BankAccountContextProvider");
  }
  return context;
};

export const useCreditCardContext = () => {
  const context = useContext(CreditCardContext);
  if (!context) {
    throw new Error("useCreditCardContext must be used within a CreditCardContextProvider");
  }
  return context;
}

export const useAppStore = create<IAppStoreData>()(
  persist((set) => (
    {
      date: dayjs().format("YYYYMM"),
      setDate: (d) => set((state) => ({ ...state, date: d })),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useSpeedDialStore = create<ISpeedDialStoreData>((set) => (
  {
    showTransactionDialog: false,
    actionShowTransactionDialog: (action) => set((state) => ({ ...state, showTransactionDialog: action })),
    transaction: {} as TransactionFormData,
    setTransaction: (t: TransactionFormData) => set((state) => ({ ...state, transaction: t })),
    showIncomeDialog: false,
    actionShowIncomeDialog: (action) => set((state) => ({ ...state, showIncomeDialog: action })),
    income: {} as TransactionFormData,
    setIncome: (i: TransactionFormData) => set((state) => ({ ...state, income: i })),
    showCategoryDialog: false,
    actionShowCategoryDialog: (action) => set((state) => ({ ...state, showCategoryDialog: action })),
    category: {} as CategoryFormData,
    setCategory: (c: CategoryFormData) => set((state) => ({ ...state, category: c })),
    showRecurringDialog: false,
    actionShowRecurringDialog: (action) => set((state) => ({ ...state, showRecurringDialog: action })),
    recurring: {} as RecurringFormData,
    setRecurring: (r: RecurringFormData) => set((state) => ({ ...state, recurring: r })),
  }
));
