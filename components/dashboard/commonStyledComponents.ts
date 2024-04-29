'use client'
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

const DashboardTopCardContentInfo = styled(Typography)(({theme}) => ({
  color: theme.palette.text.secondary,
}));

const DashboardTopCardContentRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({theme, width}) => ({
  width: width || "100%",
}));

const PaperContainer = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
}));

const TransactionListItem = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "62px",
  padding: "8px 16px",
  margin: "4px 0",
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.paper,
  borderBlockEnd: "1px solid",
  borderColor: theme.vars.palette.divider,
  "&:hover": {
    backgroundColor: theme.vars.palette.action.hover,
  },
}));


export {
  DashboardTopCardContentInfo,
  DashboardTopCardContentRow,
  PaperContainer,
  TransactionListItem,
}