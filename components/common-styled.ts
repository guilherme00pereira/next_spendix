import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

export const DashboardTopCardContentInfo = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export const DashboardTopCardContentRow = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "width",
})<{ width?: string }>(({ theme, width }) => ({
    width: width || "100%",
}));

export const PaperContainer = styled(Paper)(({ theme }) => ({
    paddingBlock: theme.spacing(3),
    paddingInline: theme.spacing(1),
}));