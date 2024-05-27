"use client";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const DashboardTopCardContentInfo = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const DashboardTopCardContentRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({ theme, width }) => ({
  width: width || "100%",
}));

export const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
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
    }
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
    }
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
    }
  },
  "& .MuiSvgIcon-root": {
    color: theme.vars.palette.error.dark,
  },
}));

export const RegularLink = styled(Link)(({ theme }) => ({
  color: theme.vars.palette.text.primary,
}));


