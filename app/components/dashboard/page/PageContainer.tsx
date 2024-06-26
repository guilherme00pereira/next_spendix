import Container from "@mui/material/Container";
import React from "react";
import { Stack, Typography } from "@mui/material";
import SelectMonthYear from "../calendar/SelectMonthYear";
import SpeedDial from "@/app/components/dashboard/dial/SpeedDial";

export interface IPageContainerProps {
  title: string;
  children: React.ReactNode;
  hideBreadcrumb?: boolean;
  breadcrumb?: React.ReactNode;
  showSelectMonthYear?: boolean;
}

const PageContainer = ({ children, title, hideBreadcrumb, breadcrumb, showSelectMonthYear }: IPageContainerProps) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, margin: "68px 0 48px" }}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {showSelectMonthYear && <SelectMonthYear />}
        {hideBreadcrumb || breadcrumb}
      </Stack>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        {children}
      </Stack>
      <SpeedDial />
    </Container>
  );
};

export default PageContainer;
