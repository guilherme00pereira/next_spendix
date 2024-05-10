'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const ActionButton = styled(Button)(({ theme }) => ({
    color: theme.vars.palette.text.secondary,
  }));

const PaperHeaderSettings = ({buttonAction}: {buttonAction: () => void}) => {
    return (
        <ActionButton
          size="small"
          variant="text"
          onClick={buttonAction}
        >
          <SettingsRoundedIcon fontSize="small"/>
        </ActionButton>
    );
};

export default PaperHeaderSettings;