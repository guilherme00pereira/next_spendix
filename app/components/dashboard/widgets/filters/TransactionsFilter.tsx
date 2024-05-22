"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SelectMonthYear from "../../calendar/SelectMonthYear";

const TransactionsFilter = ({ action }: { action: (search: string) => void }) => {
  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      action((e.target as HTMLInputElement).value);
    };
  
    const handleResetSearch = () => {
      action("");
    };
  
    return (
      <Stack direction="row">
        <SelectMonthYear />
        <FormControl>
          <OutlinedInput
            id="search"
            size="small"
            type="search"
            fullWidth
            onChange={(e) => handleChange(e)}
            endAdornment={
              <IconButton onClick={handleResetSearch}>
                <FilterListRoundedIcon color="primary" fontSize="small" />
              </IconButton>
            }
          />
        </FormControl>
      </Stack>
    );
  };

export default TransactionsFilter;