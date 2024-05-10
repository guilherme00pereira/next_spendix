"use client";
import React, { useState } from "react";
import { TransactionContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import { IRemovableEntity } from "@/types/interfaces";

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionType>({} as TransactionType);
    const [toggleTransactionDetail, setToggleTransactionDetail] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [removableTransaction, setRemovableTransaction] = useState<IRemovableEntity>({
        id: 0,
        name: "",
        type: "transação",
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
            removableObject: removableTransaction,
            setRemovableObject: setRemovableTransaction,
          }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionProvider;