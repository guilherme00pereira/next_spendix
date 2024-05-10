'use client'
import React from "react";
import {styled} from "@mui/material/styles";
import Stack from "@mui/system/Stack";
import Button from "@mui/material/Button";
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


const PaperHeader = ({title, children}: IPaperHeaderProps) => {
  return (
    <Header direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" justifyContent="start" alignItems="center">
      <Title>
        {title}
      </Title>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{flexGrow: "1"}}>
        {children}
      </Stack>
    </Header>
  );
};

export default PaperHeader;
