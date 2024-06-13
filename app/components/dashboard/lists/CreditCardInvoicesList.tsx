"use client";
import React, { useMemo } from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import { useCreditCardContext } from "@/app/lib/contexts";
import Fade from "@mui/material/Fade";
import CreditCardInvoiceListItem from "./items/CreditCardInvoiceListItem";
import AddNewInvouce from "../widgets/buttons/AddNewInvouce";

const CreditCardInvoicesList = () => {
  const { selectedCard, cardInvoices } = useCreditCardContext();

  const handleAdd = () => {
    console.log("Adicionar fatura");
  };

  return (
    <>
      {selectedCard.id && (
        <Fade in={selectedCard.id > 0} timeout={750} easing="ease-out">
          <PaperContainer width="40%">
            <PaperHeader title={`Faturas do Cartão ${selectedCard.name}`} />
            {cardInvoices && cardInvoices.sort((a: any, b:any) => a.id - b.id).map((invoice) => <CreditCardInvoiceListItem key={invoice.id} invoice={invoice} />)}
            <AddNewInvouce />
          </PaperContainer>
        </Fade>
      )}
    </>
  );
};

export default CreditCardInvoicesList;
