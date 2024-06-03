import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import Stack from "@mui/material/Stack";

const PageTopCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaperContainer sx={{ width: "100%", marginBottom: "24px !important" }}>
      <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1} width="100%">
        {children}
      </Stack>
    </PaperContainer>
  );
};

export default PageTopCard;
