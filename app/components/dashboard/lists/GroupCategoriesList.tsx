"use client";
import React, { useEffect, useState } from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import { useGroupContext } from "@/app/lib/contexts";
import { getGroupCategories } from "@/app/lib/supabase/methods/groups";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { getCategories } from "@/app/lib/supabase/methods/categories";

const GroupCategoriesList = () => {
  const { selectedGroup } = useGroupContext();
  const [linkedCategories, setLinkedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.map((category) => category.name));
    });
    if (selectedGroup.id) {
      getGroupCategories(selectedGroup.id).then((data) => {
        console.log(data);
      });
    }
  }, [selectedGroup]);

  const handleChange = (event: SelectChangeEvent<typeof linkedCategories>) => {
    const {
      target: { value },
    } = event;
    setLinkedCategories(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      {selectedGroup.id && (
        <PaperContainer>
          <PaperHeader title={`Categorias em ${selectedGroup.name}`} />
          <Stack>
            <FormControl sx={{ m: 1, width: 300 }} size="small">
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={linkedCategories}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
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
                  <MenuItem key={category} value={category}>
                    <Checkbox checked={linkedCategories.indexOf(category) > -1} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </PaperContainer>
      )}
    </>
  );
};

export default GroupCategoriesList;
