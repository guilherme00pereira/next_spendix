import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IDashboardTopCardProps } from "@/types/interfaces";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";

const TopCard = styled(Card)(({ theme }) => ({
    height: "160px",
}));

const TopCardHeader = styled(CardHeader)(({ theme }) => ({
    padding: "12px",
    color: theme.palette.primary.main,
}));

const TopCardContent = styled(CardContent)(({ theme }) => ({
    padding: "12px",
    display: "flex", 
    justifyContent: "end",
    height: "120px",
}));

const DashboardTopCard = ({ children, title, bottomValue }: IDashboardTopCardProps) => {
  return (
    <TopCard>
      <TopCardHeader title={title} />
      <TopCardContent>
        <Stack direction="column" justifyContent="flex-end">
          {children}
          <Typography variant="h4" color="secondary">
            {bottomValue}
          </Typography>
        </Stack>
      </TopCardContent>
    </TopCard>
  );
};

export default DashboardTopCard;
