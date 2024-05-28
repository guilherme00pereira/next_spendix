import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import Stack from "@mui/material/Stack";

const PageTopCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaperContainer sx={{ width: "100%", marginBottom: "24px !important" }}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {children}
      </Stack>
    </PaperContainer>
  );
};

export default PageTopCard;
