'use client'
import React, {useState} from 'react';
import { getInitColorSchemeScript } from "@mui/material/styles";
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
      {getInitColorSchemeScript()}
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;