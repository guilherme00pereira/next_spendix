'use client'
import React, {useState} from 'react';
import { PageContext } from '@/app/lib/contexts';

const PageProvider = ({children}: {children: React.ReactNode}) => {
  const [showAdd, setShowAdd] = useState<boolean>(false);

  return (
    <PageContext.Provider
      value={{
      showModal: showAdd,
      actionShowModal: setShowAdd,
      mediaQuery: "md"
    }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;