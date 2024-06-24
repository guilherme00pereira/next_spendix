'use client'
import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Checkbox,
    Stack,
    ListItemText,
    Button,
  } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CategoryType, CategoryWithStatsType } from '@/types/entities';
import AddCircleIcon from '@mui/icons-material/AddCircle';


interface ICategoriesMultiSelectProps {
    categories: CategoryType[] | CategoryWithStatsType[];
    setLinkedCategories: ([]) => void;
    setHasChanges: (c: boolean) => void;
}

const CategoriesMultiSelect = ({categories, setLinkedCategories, setHasChanges}: ICategoriesMultiSelectProps) => {
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof checkedCategories>) => {
        const {
          target: { value },
        } = event;
        setCheckedCategories(typeof value === "string" ? value.split(",") : value);
      };

      const handleLinkCategories = () => {
        const cs = categories.filter((category) => checkedCategories.includes(category.name));
        setLinkedCategories(cs);
        setCheckedCategories([]);
        setHasChanges(true);
      };
    
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <FormControl sx={{ m: 1, width: "60%" }} size="small">
              <InputLabel>Categorias</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={checkedCategories}
                onChange={handleChange}
                input={<OutlinedInput label="Categorias" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    <Checkbox checked={checkedCategories.indexOf(category.name) > -1} />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="text" size="small" onClick={handleLinkCategories}>
              <AddCircleIcon />
            </Button>
          </Stack>
    );
};

export default CategoriesMultiSelect;