"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, Button, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const CategoriesFilter = ({ action }: { action: (search: string) => void }) => {  
    
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      action((e.target as HTMLInputElement).value);
    };
  
    return (
      <Stack direction="row" spacing={2}>
        <FormControl>
          <OutlinedInput
            id="search"
            size="small"
            type="search"
            fullWidth
            onChange={(e) => handleChange(e)}
            endAdornment={
                <SearchOutlinedIcon color="action" fontSize="small" />
            }
          />
        </FormControl>
        <Button variant="outlined" size="small" startIcon={<FilterListRoundedIcon />}>
          Filtrar
        </Button>
      </Stack>
    );
  };

export default CategoriesFilter;