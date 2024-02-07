import { createContext, useContext } from "react";
import { PageContextData, TransactionContextData, AppStoreData, SpeedDialStoreData } from "@/types/interfaces";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";
import { CategoryFormData, TransactionFormData } from "@/types/entities";

export const PageContext = createContext<PageContextData>({} as PageContextData);
export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

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

export const useAppStore = create<AppStoreData>()(
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

export const useSpeedDialStore = create<SpeedDialStoreData>((set) => (
  {
    showTransactionDialog: false,
    actionShowTransactionDialog: (action) => set((state) => ({ ...state, showTransactionDialog: action })),
    transaction: {} as TransactionFormData,
    setTransaction: (t: TransactionFormData) => set((state) => ({ ...state, transaction: t })),
    showCategoryDialog: false,
    actionShowCategoryDialog: (action) => set((state) => ({ ...state, showCategoryDialog: action })),
    category: {} as CategoryFormData,
    setCategory: (c: CategoryFormData) => set((state) => ({ ...state, category: c })),
  }
));
