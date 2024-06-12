"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { InfoActionButton, DangerActionButton, PrimaryActionButton } from "@/app/components/dashboard/commonStyledComponents";
import { useCreditCardContext, usePageContext } from "@/app/lib/contexts";
import { CreditCardType } from "@/types/entities";

const CreditCardActionButtons = ({ card }: { card: CreditCardType }) => {
  const {setSelectedCard, setCardInvoices, setEditableObject} = useCreditCardContext();
  const {actionShowModal} = usePageContext();	

  const handleConfirmDelete = (id: number, name: string) => {
    console.log("delete", id, name);
  };

  const handleEdit = () => {
    setEditableObject(card);
    actionShowModal(true);
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
      <InfoActionButton size="small" variant="text" onClick={handleEdit}>
        <EditOutlinedIcon />
      </InfoActionButton>
      <DangerActionButton size="small" variant="text" onClick={() => handleConfirmDelete(card.id, card.name)}>
        <DeleteOutlinedIcon />
      </DangerActionButton>
    </Stack>
  );
};

export default CreditCardActionButtons;
