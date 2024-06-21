'use client'
import React from 'react';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Button } from '@mui/material';
import { useSettingsContext } from '@/app/lib/contexts';

const PaperHeaderSettings = () => {
  const {setOpenDrawer} = useSettingsContext();
  
    return (
        <Button
          size="small"
          variant="text"
          onClick={() => setOpenDrawer(true)}
        >
          <SettingsRoundedIcon fontSize="small"/>
        </Button>
    );
};

export default PaperHeaderSettings;