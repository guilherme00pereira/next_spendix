import React from "react";
import {styled} from "@mui/material/styles";
import Stack from "@mui/system/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {IPaperHeaderProps} from "@/types/interfaces";

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
  marginLeft: "12px !important",
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


const PaperHeader = ({title, showLink, linkTo, linkText, showSettingButon, settingsButtonAction}: IPaperHeaderProps) => {
  return (
    <Header direction="row" justifyContent="space-between" alignItems="center">
      <Box>
      <Title>
        {title}
      </Title>
      </Box>
      {showLink && (
        <ActionButton size="small" variant="text" href={linkTo
        }>
          {linkText}
        </ActionButton>
      )}
      {showSettingButon && (
        <ActionButton
          size="small"
          variant="text"
          onClick={settingsButtonAction}
        >
          <SettingsRoundedIcon fontSize="small"/>
        </ActionButton>
      )}
    </Header>
  );
};

export default PaperHeader;
