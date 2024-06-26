"use client";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";


export const DashboardTopCardContentInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const DashboardTopCardContentRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({ theme, width }) => ({
  width: width || "100%",
}));

export const PaperContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({ theme, width }) => ({
  padding: theme.spacing(2),
  width: width ?? "100%",
}));

export const ListItem = styled(Stack)(({ theme }) => ({
  width: "100%",
  margin: "4px 0",
  padding: "8px 16px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.paper,
  borderBlockEnd: "1px solid",
  borderColor: theme.vars.palette.divider,
  "&:hover": {
    backgroundColor: theme.vars.palette.action.hover,
  },
}));

export const TransactionListItem = styled(Stack)(({ theme }) => ({
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

export const ActionButton = styled(Button)(({ theme }) => ({
  padding: "4px",
  borderRadius: "4px",
  minWidth: "32px !important",
  "& .MuiSvgIcon-root": {
    fontSize: "0.875rem",
  },
}));

export const PrimaryActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.primary.alpha20,
  [theme.getColorSchemeSelector("light")]: {
    //@ts-ignore
    backgroundColor: theme.vars.palette.primary.alpha8,
  },
  "&:hover": {
    backgroundColor: theme.vars.palette.primary.main,
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.vars.palette.primary.main,
  },
}));

export const InfoActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.info.alpha20,
  [theme.getColorSchemeSelector("light")]: {
    //@ts-ignore
    backgroundColor: theme.vars.palette.info.alpha8,
  },
  "&:hover": {
    backgroundColor: theme.vars.palette.info.dark,
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.vars.palette.info.dark,
  },
}));

export const DangerActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.error.alpha20,
  [theme.getColorSchemeSelector("light")]: {
    //@ts-ignore
    backgroundColor: theme.vars.palette.error.alpha8,
  },
  "&:hover": {
    backgroundColor: theme.vars.palette.error.dark,
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.vars.palette.error.dark,
  },
}));

export const SuccessActionButton = styled(ActionButton)(({ theme }) => ({
  //@ts-ignore
  backgroundColor: theme.vars.palette.success.alpha20,
  [theme.getColorSchemeSelector("light")]: {
    //@ts-ignore
    backgroundColor: theme.vars.palette.success.alpha8,
  },
  "&:hover": {
    backgroundColor: theme.vars.palette.success.dark,
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.vars.palette.success.dark,
  },
}));

export const RegularLink = styled(Link)(({ theme }) => ({
  color: theme.vars.palette.text.primary,
}));

export const ScrollableTable = styled(TableContainer)({
  maxHeight: "480px",
  "&::-webkit-scrollbar": {
    webkitAppearance: "none",
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: "4px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
    height: "100px",
  },
});

export const PaperHeaderButtonWithHover = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.vars.palette.primary.main,
    color: "white",
  },
}));
