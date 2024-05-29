"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PaperHeaderButton } from "../../commonStyledComponents";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const CategoriesFilter = ({ action }: { action: (search: string) => void }) => {
  const { showChart, setShowChart } = useCategoriesPageContext();

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
          endAdornment={<SearchOutlinedIcon color="action" fontSize="small" />}
        />
      </FormControl>
      <PaperHeaderButton variant="outlined" size="small" startIcon={<FilterListRoundedIcon />}>
        Filtrar
      </PaperHeaderButton>
      {showChart || (
        <PaperHeaderButton variant="outlined" size="small" onClick={() => setShowChart(true)} startIcon={<BarChartOutlinedIcon />}>
          Show Categories Chart
        </PaperHeaderButton>
      )}
    </Stack>
  );
};

export default CategoriesFilter;
