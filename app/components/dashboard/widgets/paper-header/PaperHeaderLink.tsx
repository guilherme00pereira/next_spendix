"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IPaperHeaderLinkType } from "@/types/interfaces";

const ActionButton = styled(Button)(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
}));

const PaperHeaderLink = ({ target, text }: IPaperHeaderLinkType) => {
  return (
    <ActionButton variant="text" href={target}>
      {text}
    </ActionButton>
  );
};

export default PaperHeaderLink;
