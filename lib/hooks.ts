import {createContext, useContext} from "react";
import {
  IPageContextData,
  ITransactionContextData,
  IEditableObjectContextData
} from "@/types/interfaces";
import {
  BankAccountType,
  CreditCardType,
  TagType,
} from "@/types/entities";

export const PageContext = createContext<IPageContextData>({} as IPageContextData);

export const TransactionContext = createContext<ITransactionContextData>({} as ITransactionContextData);

export const BankAccountContext = createContext<IEditableObjectContextData<BankAccountType>>({} as IEditableObjectContextData<BankAccountType>);

export const CreditCardContext = createContext<IEditableObjectContextData<CreditCardType>>({} as IEditableObjectContextData<CreditCardType>);

export const TagContext = createContext<IEditableObjectContextData<TagType>>({} as IEditableObjectContextData<TagType>);

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

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagContextProvider");
  }
  return context;
};