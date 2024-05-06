"use client";
import React, { useEffect } from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import { useGroupContext } from "@/app/lib/contexts";
import { getGroupCategories } from "@/app/lib/supabase/methods/groups";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText } from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const GroupCategoriesList = () => {
  const { selectedGroup } = useGroupContext();
  const [personName, setPersonName] = React.useState<string[]>([]);

  useEffect(() => {
    getGroupCategories(selectedGroup.id).then((data) => {
      console.log(data);
    });
  }, [selectedGroup]);


  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const { target: { value } } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      {selectedGroup.id && (
        <PaperContainer>
          <PaperHeader title={`Categorias em ${selectedGroup.name}`} />
          <Stack>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
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
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
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
