import React from "react";
import Stack from "@mui/material/Stack";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import TextField from "@mui/material/TextField";

const SearchTransaction = () => {
  return (
    <PaperContainer sx={{ height: "80px" }}>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <TextField value="" name="amount" size="small" />
      </Stack>
    </PaperContainer>
  );
};

export default SearchTransaction;
