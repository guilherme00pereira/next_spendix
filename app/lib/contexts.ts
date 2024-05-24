"use client";
import { createContext, useContext } from "react";
import {
  IPageContextData,
  ITransactionContextData,
  IEditableObjectContextData,
  ICateroryContextData,
  ITransactionsPerDayContextData,
  IGroupContextData,
  ISidebarContextData,
  ICategoryDetailContextData,
  ITransactionsFiltersContextData,
} from "@/types/interfaces";
import { BankAccountType, CreditCardType, TagType } from "@/types/entities";

export const PageContext = createContext<IPageContextData>({} as IPageContextData);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

export const SidebarContext = createContext<ISidebarContextData>({} as ISidebarContextData);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};

export const TransactionContext = createContext<ITransactionContextData>({} as ITransactionContextData);
export const TransactionsPerDayContext = createContext<ITransactionsPerDayContextData>(
  {} as ITransactionsPerDayContextData
);
export const TransactionsTableFilterContext = createContext<ITransactionsFiltersContextData>({} as ITransactionsFiltersContextData);
export const CategoryContext = createContext<ICateroryContextData>({} as ICateroryContextData);
export const CategoryDetailContext = createContext<ICategoryDetailContextData>({} as ICategoryDetailContextData);
export const GroupContext = createContext<IGroupContextData>({} as IGroupContextData);
export const BankAccountContext = createContext<IEditableObjectContextData<BankAccountType>>(
  {} as IEditableObjectContextData<BankAccountType>
);
export const CreditCardContext = createContext<IEditableObjectContextData<CreditCardType>>(
  {} as IEditableObjectContextData<CreditCardType>
);
export const TagContext = createContext<IEditableObjectContextData<TagType>>({} as IEditableObjectContextData<TagType>);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionContextProvider");
  }
  return context;
};

export const useTransactionsPerDayContext = () => {
  const context = useContext(TransactionsPerDayContext);
  if (!context) {
    throw new Error("useTransactionsPerDayContext must be used within a TransactionsPerDayProvider");
  }
  return context;
};

export const useTransactionsTableFilterContext = () => {
  const context = useContext(TransactionsTableFilterContext);
  if (!context) {
    throw new Error("useTransactionsTableFilterContext must be used within a TransactionsTableFilterProvider");
  }
  return context;
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryContextProvider");
  }
  return context;
};

export const useCategoryDetailContext = () => {
  const context = useContext(CategoryDetailContext);
  if (!context) {
    throw new Error("useCategoryDetailContext must be used within a CategoryDetailContextProvider");
  }
  return context;
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroupContext must be used within a GroupContextProvider");
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
};

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagContextProvider");
  }
  return context;
};
