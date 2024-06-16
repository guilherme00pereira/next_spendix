'use client'
import React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Paper from "@mui/material/Paper";

const Widget = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100px",
  borderLeft: "none",
  padding: "18px 0 8px 36px",
  marginRight: "0px",
  [theme.breakpoints.up("md")]: {
    marginRight: "32px !important",
    width: "calc(50% - 48px)",
  },
}));

const Totals2Columns = ({ children }: { children: React.ReactNode }) => {
  return <Widget>{children}</Widget>;
};

export default Totals2Columns;
