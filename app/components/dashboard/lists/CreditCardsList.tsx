"use client";
import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { CreditCardType } from "@/types/entities";
import CreditCardsListItem from "@/app/components/dashboard/lists/items/CreditCardsListItem";
import Button from "@mui/material/Button";
import { useCreditCardContext, usePageContext } from "@/app/lib/contexts";

const CreditCardsList = ({ cards }: { cards: CreditCardType[] }) => {
  const { actionShowModal } = usePageContext();
  const { setEditableObject } = useCreditCardContext();

  const handleAdd = () => {
    actionShowModal(true);
    setEditableObject({
      id: 0,
      name: "",
      limit: 0,
      closing_day: 1,
      due_day: 1,
      color: "000",
      final_numbers: null,
      brand: null,
      credit_cards_invoices: null,
    });
  };

  return (
    <PaperContainer width="60%">
      <PaperHeader title="Meus Cartões">
        <Button variant="contained" size="small" color="primary" onClick={handleAdd}>
          Adicionar
        </Button>
      </PaperHeader>
      {cards && cards.map((card: CreditCardType) => <CreditCardsListItem key={card.id} card={card} />)}
    </PaperContainer>
  );
};

export default CreditCardsList;
