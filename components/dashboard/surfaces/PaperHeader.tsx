import React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/system/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { IPaperHeaderProps } from "@/types/interfaces";

const Header = styled(Stack)(({ theme }) => ({
    borderBlockEnd: `1px solid ${theme.vars.palette.divider}`,
    marginBlockEnd: theme.spacing(1),
    paddingBlockEnd: theme.spacing(1),
}));

const ActionButton = styled(Button)(({theme}) => ({
    color: theme.vars.palette.text.secondary,
}));

const PaperHeader = ({title, showSettingButon, buttonAction}: IPaperHeaderProps) => {
  return (
    <Header direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" textAlign="center" sx={{ml: "12px !important"}}>
        {title}
      </Typography>
      {showSettingButon && (
         <ActionButton
         size="small"
         variant="text"
         onClick={buttonAction}
       >
            <SettingsRoundedIcon fontSize="small" />
         </ActionButton>
      )}
    </Header>
  );
};

export default PaperHeader;
