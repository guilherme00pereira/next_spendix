"use client";
import React from 'react';
import { PaperContainer } from '../commonStyledComponents';
import PaperHeader from '../surfaces/PaperHeader';
import { useCreditCardContext } from '@/app/lib/contexts';

const CreditCardInvoicesList = () => {
    const {selectedCard} = useCreditCardContext();

    return (
        <PaperContainer>
            <PaperHeader title={`Faturas do Cartão ${selectedCard.name}`} />
            {/* <CreditCardInvoicesListItem key={invoice.id} invoice={invoice} /> */}
        </PaperContainer>
    );
};

export default CreditCardInvoicesList;