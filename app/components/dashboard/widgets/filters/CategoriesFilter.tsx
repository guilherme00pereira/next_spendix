"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, Menu, MenuItem, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PaperHeaderButtonWithHover } from "@/app/components/dashboard/commonStyledComponents";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const CategoriesFilter = ({ action }: { action: (search: string) => void }) => {
  const { showCategoriesChart: showChart, setShowCategoriesChart: setShowChart } = useCategoriesPageContext();
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
      <PaperHeaderButtonWithHover
        variant="outlined"
        size="small"
        startIcon={<SortByAlphaRoundedIcon />}
        onClick={(e: any) => setAnchorFilter(e.currentTarget)}
      >
        Ordenar
      </PaperHeaderButtonWithHover>
      <PaperHeaderButtonWithHover
        variant="outlined"
        size="small"
        startIcon={<FilterListRoundedIcon />}
        onClick={(e: any) => setAnchorFilter(e.currentTarget)}
      >
        Filtrar
      </PaperHeaderButtonWithHover>
      <Menu
        id="menu-filter"
        keepMounted
        open={Boolean(anchorFilter)}
        onClose={() => setAnchorFilter(null)}
      >
        <MenuItem onClick={() => setShowChart(false)}>Hide Chart</MenuItem>
      </Menu>
      {showChart || (
        <PaperHeaderButtonWithHover
          variant="outlined"
          size="small"
          onClick={() => setShowChart(true)}
          startIcon={<BarChartOutlinedIcon />}
        >
          Show Chart
        </PaperHeaderButtonWithHover>
      )}
    </Stack>
  );
};

export default CategoriesFilter;
