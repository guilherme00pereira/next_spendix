'use client'
import React from "react";
import {styled} from "@mui/material/styles";
import Stack from "@mui/system/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {IPaperHeaderProps} from "@/types/interfaces";
import { Badge } from "@mui/material";

const Header = styled(Stack)(({theme}) => ({
  borderBlockEnd: `1px solid ${theme.vars.palette.divider}`,
  marginBlockEnd: theme.spacing(1),
  paddingBlockEnd: theme.spacing(1),
  position: "relative",
}));

const ActionButton = styled(Button)(({theme}) => ({
  color: theme.vars.palette.text.secondary,
}));

const Title = styled("div")(({theme}) => ({
  margin: "0 24px 0 18px !important",
  fontSize: "1em",
  fontWeight: "bold",
  paddingBlockEnd: "8px !important",
  "&::before": {
    content: "''",
    width: "4px",
    height: "60%",
    backgroundColor: theme.vars.palette.primary.main,
    position: "absolute",
    top: 0,
    left: 0,
  }
}));


const PaperHeader = ({title, link, settings, badge}: IPaperHeaderProps) => {
  return (
    <Header direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" justifyContent="start" alignItems="center">
      <Title>
        {title}
      </Title>
      {(badge && badge.show) && (
        <Badge badgeContent={badge.content} color={badge.color} sx={{marginTop: "-5px"}} />
      )}
      </Stack>
      
      {(link && link.show) && (
        <ActionButton size="small" variant="text" href={link.target
        }>
          {link.text}
        </ActionButton>
      )}
      {(settings && settings.showButton) && (
        <ActionButton
          size="small"
          variant="text"
          onClick={settings.buttonAction}
        >
          <SettingsRoundedIcon fontSize="small"/>
        </ActionButton>
      )}
    </Header>
  );
};

export default PaperHeader;
