'use client'
import React, {useState} from 'react';
import { SettingsContext } from '@/app/lib/contexts';

const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <SettingsContext.Provider value={{
        openDrawer,
        setOpenDrawer
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;