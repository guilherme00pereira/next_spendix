"use client";
import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { CreditCardType } from "@/types/entities";
import CreditCardsListItem from "@/app/components/dashboard/lists/items/CreditCardsListItem";
import Button from "@mui/material/Button";
import { useCreditCardContext, usePageContext } from "@/app/lib/contexts";

const CreditCardsList = ({ cards }: { cards: CreditCardType[] }) => {
  const { showModal, actionShowModal } = usePageContext();
  const { openConfirm, setOpenConfirm, removableObject, setRemovableObject, setEditableObject } = useCreditCardContext();

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableObject({ ...removableObject, id, name });
    setOpenConfirm(true);
  };

  const handleEdit = (id: number) => {
    actionShowModal(true);
    const c = cards?.filter((card) => card.id === id)[0] ?? ({} as CreditCardType);
    setEditableObject({
      id: c.id ?? 0,
      name: c.name ?? "",
      limit: c.limit ?? 0,
      closing_day: c.closing_day ?? 0,
      due_day: c.due_day ?? 0,
      color: c.color ?? "000",
      invoices: c.invoices ?? null,
    });
  };

  const handleAdd = () => {
    actionShowModal(true);
    setEditableObject({
      id: 0,
      name: "",
      limit: 0,
      closing_day: 0,
      due_day: 0,
      color: "000",
      invoices: null,
    });
  };

  return (
    <PaperContainer width="90%">
      <PaperHeader title="Cartões de Crédito">
        <Button variant="contained" size="small" color="primary" onClick={handleAdd}>
          Adicionar
        </Button>
      </PaperHeader>
      {cards && cards.map((card: CreditCardType) => <CreditCardsListItem key={card.id} card={card} />)}
    </PaperContainer>
  );
};

export default CreditCardsList;
