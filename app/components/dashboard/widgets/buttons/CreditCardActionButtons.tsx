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
  const {} = useCreditCardContext();

  const handleConfirmDelete = (id: number, name: string) => {
    console.log("delete", id, name);
  };

  const handleEdit = (id: number) => {
    console.log("edit", id);
  };

  const handleShowInvoices = (id: number) => {
    fetch(`/api/invoices?id=${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <Stack direction="row" spacing={1}>
      <PrimaryActionButton size="small" variant="text" onClick={() => handleShowInvoices(card.id)}>
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
