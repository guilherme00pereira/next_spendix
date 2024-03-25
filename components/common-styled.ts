import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Stack, shouldForwardProp } from "@mui/system";

export const DashboardTopCardContentInfo = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export const DashboardTopCardContentRow = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({ theme, width }) => ({
    width: width || "100%",
}));