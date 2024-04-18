import React from "react";
import { PaperContainer } from "@/components/common-styled";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";

const OverdueTransactionsList = () => {
  return (
    <PaperContainer>
      <PaperHeader title="Contas em atraso" />
      <Stack>em atraso</Stack>
    </PaperContainer>
  );
};

export default OverdueTransactionsList;
