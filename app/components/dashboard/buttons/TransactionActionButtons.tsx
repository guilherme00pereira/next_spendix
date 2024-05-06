'use client';
import React from "react";
import { useTransactionContext } from "@/app/lib/contexts";
import { useSpeedDialStore } from "@/app/lib/store";
import { TransactionType } from "@/types/entities";
import { ButtonGroup, Button } from "@mui/material";
import dayjs from "dayjs";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { InfoActionButton, PrimaryActionButton } from "@/app/components/dashboard/commonStyledComponents";

const TransactionActionButtons = ({transaction}: {transaction: TransactionType}) => {
  const { setTransaction, actionShowTransactionDialog, setIncome, actionShowIncomeDialog } = useSpeedDialStore();
  const { actionShowTransactionDetail, setSelectedTransaction } = useTransactionContext();

  const handleEdit = (t: TransactionType) => {
    const obj = {
      id: t.id,
      amount: t.amount,
      due_date: dayjs(t.due_date),
      description: t.description,
      cashed: !!t.payments?.id,
      category_id: t.categories?.id ?? 0,
      payment_date: t.payments?.date ? dayjs(t.payments.date) : null,
      payed_amount: t.payments?.amount ?? null,
      payment_method_id: 1,
      payment_id: t.payments?.id ?? 0,
      in_installments: !!t.installments,
      installments: 2,
      draft: t.draft,
      tags: [],
    };

    if (t.categories?.type === "Receita") {
      setIncome(obj);
      actionShowIncomeDialog(true);
    } else {
      setTransaction(obj);
      actionShowTransactionDialog(true);
    }
  };

  const handleShowDetail = (t: TransactionType) => {
    setSelectedTransaction(t);
    actionShowTransactionDetail(true);
  };

  return (
    <>
      <PrimaryActionButton size="small" variant="text" onClick={() => handleShowDetail(transaction)}>
        <VisibilityOutlinedIcon />
      </PrimaryActionButton>
      <InfoActionButton size="small" variant="text" onClick={() => handleEdit(transaction)}>
        <EditOutlinedIcon />
      </InfoActionButton>
    </>
  );
};

export default TransactionActionButtons;
