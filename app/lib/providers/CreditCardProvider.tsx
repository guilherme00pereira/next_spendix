'use client'
import React, {useState} from 'react';
import { CreditCardContext } from '@/app/lib/contexts';
import { CreditCardType } from '@/types/entities';

const CreditCardProvider = ({children}: {children: React.ReactNode}) => {
  const [editableCard, setEditableCard] = useState({} as CreditCardType);
  const [openConfirm, setOpenConfirm] = useState(false);	
  const [removableCard, setRemovableCard] = useState({
    id: 0,
    name: '',
    type: 'cartão de crédito',
  });

  return (
    <CreditCardContext.Provider value={
      {
        editableObject: editableCard,
        setEditableObject: setEditableCard,
        openConfirm,
        setOpenConfirm,
        removableObject: removableCard,
        setRemovableObject: setRemovableCard,
      }
    }>
      {children}
    </CreditCardContext.Provider>
  );
};

export default CreditCardProvider;