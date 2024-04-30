'use client'
import React, {useState} from 'react';
import { CreditCardContext } from '@/app/lib/contexts';
import { CreditCardType } from '@/types/entities';

const CreditCardProvider = ({children}: {children: React.ReactNode}) => {
  const [editableCard, setEditableCard] = useState({} as CreditCardType);

  return (
    <CreditCardContext.Provider value={{editableObject: editableCard, setEditableObject: setEditableCard}}>
      {children}
    </CreditCardContext.Provider>
  );
};

export default CreditCardProvider;