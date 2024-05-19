"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import FilterListOffRoundedIcon from '@mui/icons-material/FilterListOffRounded';

const CategoriesFilters = ({ action }: { action: (search: string) => void }) => {
    const [showInput, setShowInput] = React.useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      action((e.target as HTMLInputElement).value);
    };
  
    const handleResetSearch = () => {
      setShowInput(false);
      action("");
    };
  
    return (
      <Stack direction="row">
        <FormControl sx={{ display: showInput ? "block" : "none" }}>
          <OutlinedInput
            id="search"
            size="small"
            type="search"
            fullWidth
            onChange={(e) => handleChange(e)}
            endAdornment={
              <IconButton onClick={handleResetSearch}>
                <FilterListOffRoundedIcon color="action" fontSize="small" />
              </IconButton>
            }
          />
        </FormControl>
        <IconButton onClick={() => setShowInput(true)} sx={{ display: showInput ? "none" : "block", padding: "6px 14px 0 0" }}>
          <FilterListRoundedIcon color="primary" />
        </IconButton>
      </Stack>
    );
  };

export default CategoriesFilters;