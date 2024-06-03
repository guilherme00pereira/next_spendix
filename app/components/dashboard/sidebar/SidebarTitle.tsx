'use client'
import React from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WalletIcon from "@mui/icons-material/Wallet";
import { useSidebarContext } from '@/app/lib/contexts';

const SidebarTitle = () => {
    const { openSidebar } = useSidebarContext();
    
    return (
        <Stack direction="row" spacing={1}>
          {openSidebar && (
            <>
              <WalletIcon color="primary" />
              <Typography variant="h5" color="primary">
                1WALLET
              </Typography>
            </>
          )}
          {openSidebar || <WalletIcon color="primary" />}
        </Stack>
    );
};

export default SidebarTitle;