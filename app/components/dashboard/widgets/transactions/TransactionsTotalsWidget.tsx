"use client";
import React, { useMemo } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import { amountFormatter } from "@/app/lib/functions";

interface ITransactionsTotalsWidgetProps {
  value: number;
  title: string;
  income: boolean;
  color: string;
  first?: boolean;
}

const Widget = styled(Box, 
  { shouldForwardProp: (prop) => prop !== "first" }
)<{first: boolean}>(({ theme, first }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "calc(50% - 16px)",
  },
  [theme.breakpoints.up("lg")]: {
    width: "calc(20% - 16px)",
  },
  borderLeft: "none",
  [theme.breakpoints.up("md")]: {
    borderLeft: first ? "none" : "2px solid",
    borderColor: first ? "none" : alpha(theme.palette.text.primary, 0.12),
  },
  padding: "8px 0 8px 36px",
  borderRadius: "0px",
  boxShadow: "none",
}));

const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{ bgcolor: string }>(({ theme, bgcolor }) => ({
  borderRadius: "4px",
  padding: "4px",
  backgroundColor: bgcolor, //income ? theme.vars.palette.success.dark : theme.vars.palette.error.dark,
  color: "white",
}));

const TransactionsTotalsWidget = ({ value, title, income, color, first }: ITransactionsTotalsWidgetProps) => {
  const theme = useTheme();

  const getColor = (colorType: string) => {
    switch (colorType) {
      case 'success':
        return theme.palette.success.dark;
      case 'warning':
        return theme.palette.warning.dark;
      case 'error':
        return theme.palette.error.dark;
      case 'info':
        return theme.palette.info.dark;
      default:
        return theme.palette.text.primary;
    }
  };

  

  return (
    <Widget first={first ?? false}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        <IconBox bgcolor={getColor(color)}>
          {income ? <PointOfSaleRoundedIcon sx={{ fontSize: "1.25rem" }} /> : <PaymentRoundedIcon sx={{ fontSize: "1.25rem" }} />}
        </IconBox>
        <Stack direction="column" alignItems="start" sx={{pl: 3}}>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>{title}</Box>
          <Box sx={{ fontSize: "1.5rem", color: getColor(color) }}>{amountFormatter(value)}</Box>
        </Stack>
      </Stack>
    </Widget>
  );
};

export default TransactionsTotalsWidget;
