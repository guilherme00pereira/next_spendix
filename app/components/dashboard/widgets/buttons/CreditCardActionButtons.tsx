"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { InfoActionButton, DangerActionButton, PrimaryActionButton } from "@/app/components/dashboard/commonStyledComponents";
import { useCreditCardContext } from "@/app/lib/contexts";
import { CreditCardType } from "@/types/entities";

const CreditCardActionButtons = ({ card }: { card: CreditCardType }) => {
  const {setSelectedCard, setCardInvoices} = useCreditCardContext();

  const handleConfirmDelete = (id: number, name: string) => {
    console.log("delete", id, name);
  };

  const handleEdit = (id: number) => {
    console.log("edit", id);
  };

  const handleShowInvoices = () => {
    setSelectedCard(card);
    card.credit_cards_invoices && setCardInvoices([...card.credit_cards_invoices]);
  };


  return (
    <Stack direction="row" spacing={1}>
      <PrimaryActionButton size="small" variant="text" onClick={handleShowInvoices}>
        <ReceiptLongOutlinedIcon />
      </PrimaryActionButton>
      <InfoActionButton size="small" variant="text" onClick={() => handleEdit(card.id)}>
        <EditOutlinedIcon />
      </InfoActionButton>
      <DangerActionButton size="small" variant="text" onClick={() => handleConfirmDelete(card.id, card.name)}>
        <DeleteOutlinedIcon />
      </DangerActionButton>
    </Stack>
  );
};

export default CreditCardActionButtons;
