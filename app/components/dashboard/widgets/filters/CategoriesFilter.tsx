"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, Menu, MenuItem, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PaperHeaderButton } from "../../commonStyledComponents";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const CategoriesFilter = ({ action }: { action: (search: string) => void }) => {
  const { showChart, setShowChart } = useCategoriesPageContext();
  const [anchorFilter, setAnchorFilter] = React.useState<null | HTMLElement>(null);

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
      <PaperHeaderButton
        variant="outlined"
        size="small"
        startIcon={<SortByAlphaRoundedIcon />}
        onClick={(e) => setAnchorFilter(e.currentTarget)}
      >
        Ordenar
      </PaperHeaderButton>
      <PaperHeaderButton
        variant="outlined"
        size="small"
        startIcon={<FilterListRoundedIcon />}
        onClick={(e) => setAnchorFilter(e.currentTarget)}
      >
        Filtrar
      </PaperHeaderButton>
      <Menu
        id="menu-filter"
        keepMounted
        open={Boolean(anchorFilter)}
        onClose={() => setAnchorFilter(null)}
      >
        <MenuItem onClick={() => setShowChart(false)}>Hide Chart</MenuItem>
      </Menu>
      {showChart || (
        <PaperHeaderButton
          variant="outlined"
          size="small"
          onClick={() => setShowChart(true)}
          startIcon={<BarChartOutlinedIcon />}
        >
          Show Chart
        </PaperHeaderButton>
      )}
    </Stack>
  );
};

export default CategoriesFilter;
