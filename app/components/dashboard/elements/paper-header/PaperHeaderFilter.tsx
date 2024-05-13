import React from "react";
import Box from "@mui/material/Box";
import { FormControl, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

const PaperHeaderFilter = ({
  action,
}: {
  action: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}) => {
  return (
    <Box>
      <FormControl>
        <OutlinedInput
          id="search"
          size="small"
          type="search"
          fullWidth
          onKeyUp={(e) => action(e)}
          endAdornment={<FilterListRoundedIcon color="primary" />}
        />
      </FormControl>
    </Box>
  );
};

export default PaperHeaderFilter;
