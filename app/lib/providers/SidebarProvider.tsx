'use client'
import React from 'react';
import { useAppStore } from '../store';
import { SidebarContext } from '@/app/lib/contexts';

const SidebarProvider = ({children}: {children: React.ReactNode}) => {
    const openSidebar = useAppStore((state) => state.openSidebar);
  const setOpenSidebar = useAppStore((state) => state.setOpenSidebar);

    return (
        <SidebarContext.Provider value={
            {
                openSidebar,
                setOpenSidebar
            }
        
        }>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
