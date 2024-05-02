import { CategoryFormData, GroupFormData, RecurringFormData, TransactionFormData } from "@/types/entities";
import { IAppPersistData, ISpeedDialStoreData } from "@/types/interfaces";
import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAppStore = create<IAppPersistData>()(
    persist((set) => (
        {
          date: dayjs().format("YYYYMM"),
          setDate: (d) => set((state) => ({...state, date: d})),
          openSidebar: false,
          setOpenSidebar: (action) => set((state) => ({...state, openSidebar: action})),
        }),
      {
        name: "app-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
  
  export const useSpeedDialStore = create<ISpeedDialStoreData>((set) => (
    {
      showTransactionDialog: false,
      actionShowTransactionDialog: (action) => set((state) => ({...state, showTransactionDialog: action})),
      transaction: {} as TransactionFormData,
      setTransaction: (t: TransactionFormData) => set((state) => ({...state, transaction: t})),
      showIncomeDialog: false,
      actionShowIncomeDialog: (action) => set((state) => ({...state, showIncomeDialog: action})),
      income: {} as TransactionFormData,
      setIncome: (i: TransactionFormData) => set((state) => ({...state, income: i})),
      showCategoryDialog: false,
      actionShowCategoryDialog: (action) => set((state) => ({...state, showCategoryDialog: action})),
      category: {} as CategoryFormData,
      setCategory: (c: CategoryFormData) => set((state) => ({...state, category: c})),
      showRecurringDialog: false,
      actionShowRecurringDialog: (action) => set((state) => ({...state, showRecurringDialog: action})),
      recurring: {} as RecurringFormData,
      setRecurring: (r: RecurringFormData) => set((state) => ({...state, recurring: r})),
      showGroupDialog: false,
      actionShowGroupDialog: (action) => set((state) => ({...state, showGroupDialog: action})),
      group: {} as GroupFormData,
      setGroup: (g: GroupFormData) => set((state) => ({...state, group: g})),
    }
  ));
  