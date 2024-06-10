'use client'
import React, {useState} from 'react';
import { CreditCardContext } from '@/app/lib/contexts';
import { CreditCardInvoiceType, CreditCardType } from '@/types/entities';

const CreditCardProvider = ({children}: {children: React.ReactNode}) => {
  const [editableCard, setEditableCard] = useState<CreditCardType>({} as CreditCardType);
  const [selectedCard, setSelectedCard] = useState<CreditCardType>({} as CreditCardType);
  const [openConfirm, setOpenConfirm] = useState(false);	
  const [removableCard, setRemovableCard] = useState({
    id: 0,
    name: '',
    type: 'cartão de crédito',
  });
  const [invoices, setInvoices] = useState([] as CreditCardInvoiceType[]);

  return (
    <CreditCardContext.Provider value={
      {
        editableObject: editableCard,
        setEditableObject: setEditableCard,
        openConfirm,
        setOpenConfirm,
        removableObject: removableCard,
        setRemovableObject: setRemovableCard,
        selectedCard,
        setSelectedCard,
        cardInvoices: invoices,
        setCardInvoices: setInvoices,
      }
    }>
      {children}
    </CreditCardContext.Provider>
  );
};

export default CreditCardProvider;