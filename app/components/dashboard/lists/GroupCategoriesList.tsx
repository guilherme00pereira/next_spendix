"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import { useGroupContext } from "@/app/lib/contexts";
import { getGroupCategories } from "@/app/lib/actions/group-actions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import { CategoryType } from "@/types/entities";

const GroupCategoriesList = ({ categories }: { categories: CategoryType[] }) => {
  const { selectedGroup } = useGroupContext();
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [linkedCategories, setLinkedCategories] = useState<CategoryType[]>([]);

  // useEffect(() => {
  //   if (selectedGroup.id) {
  //     getGroupCategories(selectedGroup.id).then((data) => {
  //       console.log(data);
  //     });
  //   }
  // }, [selectedGroup]);

  const handleChange = (event: SelectChangeEvent<typeof checkedCategories>) => {
    const {
      target: { value },
    } = event;
    setCheckedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleLinkCategories = () => {
    const cs = categories.filter((category) => checkedCategories.includes(category.name));
    console.log(cs);
    setLinkedCategories(cs);
  };

  return (
    <>
      {selectedGroup.id && (
        <PaperContainer>
          <PaperHeader title={`Categorias em ${selectedGroup.name}`} />
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
            <Button variant="contained" size="small" onClick={handleLinkCategories}>
              <AddIcon />
            </Button>
          </Stack>
          <Stack direction="column" justifyContent="center">
            <List>
              {linkedCategories.map((category) => (
                <ListItem key={category.id}>{category.name}</ListItem>
              ))}
            </List>
          </Stack>
        </PaperContainer>
      )}
    </>
  );
};

export default GroupCategoriesList;
