import Container from "@mui/material/Container";
import React from "react";
import Breadcrumb from "./Breadcrumb";
import { Stack, Typography } from "@mui/material";
import { IPageContainerProps } from "@/types/interfaces";
import SelectMonthYear from "../calendar/SelectMonthYear";

const PageContainer = ({ children, title, hideBreadcrumb, showSelectMonthYear }: IPageContainerProps) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, margin: "68px 0 48px" }}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {showSelectMonthYear && <SelectMonthYear />}
        {hideBreadcrumb || <Breadcrumb />}
      </Stack>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        {children}
      </Stack>
    </Container>
  );
};

export default PageContainer;
