import { Dispatch, SetStateAction } from "react";
import { TransactionType, GroupType, CreditCardType, CreditCardInvoiceType, CategoryType } from "./entities";
import { IRemovableEntity, IRemovableTransaction } from "./interfaces";

export interface IEditableObjectContextData<T> {
    editableObject: T;
    setEditableObject: Dispatch<SetStateAction<T>>;
}

export interface IPageContextData {
    showModal: boolean;
    actionShowModal: (action: boolean) => void;
    mediaQuery: string;
}

export interface ISidebarContextData {
    openSidebar: boolean;
    setOpenSidebar: (action: boolean) => void;
}

interface IDeletableObjectContextData {
    removableObject: IRemovableEntity;
    setRemovableObject: Dispatch<SetStateAction<IRemovableEntity>>;
    openConfirm: boolean;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
}

export interface ITransactionContextData {
    selectedTransaction: TransactionType;
    setSelectedTransaction: Dispatch<SetStateAction<TransactionType>>;
    showTransactionDetail: boolean;
    actionShowTransactionDetail: (action: boolean) => void;
    removableTransaction: IRemovableTransaction;
    setRemovableTransaction: Dispatch<SetStateAction<IRemovableTransaction>>;
    openConfirm: boolean;
    setOpenConfirm: Dispatch<SetStateAction<boolean>>;
}

export interface ITransactionsPerDayContextData {
    selectedDay: string;
    setSelectedDay: Dispatch<SetStateAction<string>>;
}

export interface ITransactionsFiltersContextData {
    filteredTransactions: TransactionType[];
    setFilteredTransactions: Dispatch<SetStateAction<TransactionType[]>>;
}

export interface ICateroryContextData extends IDeletableObjectContextData{}

export interface ICategoryDetailContextData extends IDeletableObjectContextData {
    groupByMonth: boolean;
    setGroupByMonth: Dispatch<SetStateAction<boolean>>;
}

export interface IGroupContextData extends IDeletableObjectContextData, IEditableObjectContextData<GroupType> {
    selectedGroup: GroupType;
    setSelectedGroup: Dispatch<SetStateAction<GroupType>>;
    showGroupDialog: boolean;
    setShowGroupDialog: (action: boolean) => void;
    showChart: boolean;
    setShowChart: (action: boolean) => void;
}

export interface ICreditCardContextData extends IDeletableObjectContextData, IEditableObjectContextData<CreditCardType> {
    selectedCard: CreditCardType;
    setSelectedCard: Dispatch<SetStateAction<CreditCardType>>;
    cardInvoices: CreditCardInvoiceType[];
    setCardInvoices: Dispatch<SetStateAction<CreditCardInvoiceType[]>>;
}

export interface ICategoriesPageContextData {
    showCategoriesChart: boolean;
    setShowCategoriesChart: (action: boolean) => void;
    showCategoryTotalsChart: boolean;
    setShowCategoryTotalsChart: (action: boolean) => void;
}

export interface ISettingsContextData {
    openDrawer: boolean;
    setOpenDrawer: (action: boolean) => void;
}

export interface IAllTransactionsPageContextData {
    totalIncome: number;
    setTotalIncome: Dispatch<SetStateAction<number>>;
    totalExpense: number;
    setTotalExpense: Dispatch<SetStateAction<number>>;
    dailyMean: number;
    setDailyMean: Dispatch<SetStateAction<number>>;
}

export interface ISelectableCategoriesContextData {
    linkedCategories: CategoryType[];
    setLinkedCategories: Dispatch<SetStateAction<CategoryType[]>>;
    hasChanges: boolean;
    setHasChanges: Dispatch<SetStateAction<boolean>>;
}