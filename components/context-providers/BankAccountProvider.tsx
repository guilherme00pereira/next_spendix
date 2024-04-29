'use client'
import React, {useState} from 'react';
import { BankAccountContext } from '@/lib/contexts';
import { BankAccountType } from '@/types/entities';

const BankAccountProvider = ({children}: {children: React.ReactNode}) => {
  const [editableAccount, setEditableAccount] = useState({} as BankAccountType);

  return (
    <BankAccountContext.Provider value={{editableObject: editableAccount, setEditableObject: setEditableAccount}}>
      {children}
    </BankAccountContext.Provider>
  );
};

export default BankAccountProvider;