"use client";
import React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import { amountFormatter } from "@/app/lib/functions";
import { Typography } from "@mui/material";

interface ITransactionsTotalsWidgetProps {
  value: number;
  title: string;
  income: boolean;
  color: string;
}



const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{ bgcolor: string }>(({ theme, bgcolor }) => ({
  borderRadius: "4px",
  padding: "4px",
  backgroundColor: bgcolor, //income ? theme.vars.palette.success.dark : theme.vars.palette.error.dark,
  color: "white",
}));

const TransactionsTotalsWidget = ({ value, title, income, color }: ITransactionsTotalsWidgetProps) => {
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
    <>
      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        <IconBox bgcolor={getColor(color)}>
          {income ? <PointOfSaleRoundedIcon sx={{ fontSize: "1.25rem" }} /> : <PaymentRoundedIcon sx={{ fontSize: "1.25rem" }} />}
        </IconBox>
        <Stack direction="column" alignItems="start" sx={{pl: 3}}>
          <Box>
            <Typography variant="caption" component="span" color="text.secondary">
              {title}
            </Typography>
            </Box>
          <Box>
          <Typography variant="h6" component="span" color={getColor(color)}>
              {amountFormatter(value)}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default TransactionsTotalsWidget;
