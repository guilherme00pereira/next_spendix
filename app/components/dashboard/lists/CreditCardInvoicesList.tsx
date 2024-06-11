"use client";
import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import { useCreditCardContext } from "@/app/lib/contexts";
import Fade from "@mui/material/Fade";
import CreditCardInvoiceListItem from "./items/CreditCardInvoiceListItem";

const CreditCardInvoicesList = () => {
  const { selectedCard, cardInvoices } = useCreditCardContext();

  return (
    <>
      {selectedCard.id && (
        <Fade in={selectedCard.id > 0} timeout={750} easing="ease-out">
        <PaperContainer width="40%">
          <PaperHeader title={`Faturas do Cartão ${selectedCard.name}`} />
          {cardInvoices &&
            cardInvoices.map((invoice) => (
              <CreditCardInvoiceListItem key={invoice.id} invoice={invoice} />
            ))}
        </PaperContainer>
        </Fade>
      )}
    </>
  );
};

export default CreditCardInvoicesList;
