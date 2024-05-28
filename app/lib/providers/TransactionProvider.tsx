"use client";
import React, { useState } from "react";
import { TransactionContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import { IRemovableTransaction } from "@/types/interfaces";

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>({} as TransactionType);
    const [toggleTransactionDetail, setToggleTransactionDetail] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [removableTransaction, setRemovableTransaction] = useState<IRemovableTransaction>({
        id: 0,
        name: "",
        type: "transação",
        payment_id: null,
        amount: 0,
    });


    return (
        <TransactionContext.Provider
          value={{
            selectedTransaction,
            setSelectedTransaction,
            showTransactionDetail: toggleTransactionDetail,
            actionShowTransactionDetail: setToggleTransactionDetail,
            openConfirm,
            setOpenConfirm,
            removableTransaction,
            setRemovableTransaction,
          }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionProvider;