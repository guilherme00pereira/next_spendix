"use client";
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Card from "@mui/material/Card";
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
}

const Widget = styled(Card)(({ theme }) => ({
  height: "80px",
  borderRadius: "8px",
  padding: "12px",
}));

const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "income",
})<{ income: boolean }>(({ theme, income }) => ({
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: income ? theme.vars.palette.success.dark : theme.vars.palette.error.dark,
  color: "white",
}));

const TransactionsTotalsWidget = ({ value, title, income, color }: ITransactionsTotalsWidgetProps) => {
  return (
    <Widget>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <IconBox income={income}>
          {income ? <PointOfSaleRoundedIcon sx={{ fontSize: "1.5rem" }} /> : <PaymentRoundedIcon sx={{ fontSize: "1.5rem" }} />}
        </IconBox>
        <Stack direction="column" alignItems="start">
          <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{title}</Box>
          <Box sx={{ fontSize: "1.25rem", color: color }}>{amountFormatter(value)}</Box>
        </Stack>
      </Stack>
    </Widget>
  );
};

export default TransactionsTotalsWidget;
