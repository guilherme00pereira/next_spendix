"use client";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { fontSize } from "@mui/system";

const DashboardTopCardContentInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const DashboardTopCardContentRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({ theme, width }) => ({
  width: width || "100%",
}));

const PaperContainer = styled(Paper)(({ theme }) => ({
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

const ActionButton = styled(Button)(({ theme }) => ({
  padding: "4px",
  borderRadius: "4px",
  minWidth: "32px !important",
  "& .MuiSvgIcon-root": {
    fontSize: "0.875rem",
  },
}));

const PrimaryActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.primary.alpha8,
  "&:hover": {
    backgroundColor: theme.vars.palette.primary.dark,
  },
  "& .MuiSvgIcon-root": {
    fill: theme.vars.palette.primary.dark,
    "&:hover": {
      //@ts-ignore
      fill: theme.vars.palette.primary.alpha8 + " !important",
    },
  },
}));

const InfoActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.info.alpha8,
  "&:hover": {
    backgroundColor: theme.vars.palette.info.dark,
  },
  "& .MuiSvgIcon-root": {
    fill: theme.vars.palette.info.dark,
    "&:hover": {
      //@ts-ignore
      fill: theme.vars.palette.info.alpha8 + " !important",
    },
  },
}));

const DangerActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.error.alpha8,
  "&:hover": {
    backgroundColor: theme.vars.palette.error.dark,
    //@ts-ignore
    color: "white !important",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.vars.palette.error.dark,
  },
}));

export {
  DashboardTopCardContentInfo,
  DashboardTopCardContentRow,
  PaperContainer,
  TransactionListItem,
  PrimaryActionButton,
  InfoActionButton,
  DangerActionButton,
};
