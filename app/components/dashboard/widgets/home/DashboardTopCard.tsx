'use client'
import React from "react";
import { styled } from "@mui/material/styles";
import type {} from '@mui/material/themeCssVarsAugmentation';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IDashboardTopCardProps } from "@/types/interfaces";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";

const TopCard = styled(Card)(({ theme }) => ({
  minHeight: "180px",
  borderRadius: "8px",
  "& .MuiCardContent-root:last-child": {
    paddingBottom: "0px",
  },
}));

const TopCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: "12px",
  color: theme.vars.palette.text.primary,
}));

const TopCardContent = styled(CardContent)(({ theme }) => ({
  padding: "12px",
  display: "flex",
  justifyContent: "end",
}));

const DashboardTopCard = ({
  children,
  title,
  bottomValue,
}: IDashboardTopCardProps) => {
  return (
    <TopCard>
      <TopCardHeader title={title} titleTypographyProps={{fontSize: "1rem"}} />
      <TopCardContent>
        
          <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="end"
            width="100%"
          >
            {children}
            <Typography variant="h5" color="secondary" sx={{ mt: 1 }}>
              {bottomValue}
            </Typography>
          </Stack>
        
      </TopCardContent>
    </TopCard>
  );
};

export default DashboardTopCard;
