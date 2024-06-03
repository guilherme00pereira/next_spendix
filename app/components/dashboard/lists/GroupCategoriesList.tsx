"use client";
import React, { useMemo, useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  List,
  ListItemText,
  Button,
} from "@mui/material";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import { useGroupContext } from "@/app/lib/contexts";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import { CategoryType } from "@/types/entities";
import GroupCategoriesListItem from "./items/GroupCategoriesListItem";

const GroupCategoriesList = ({ categories }: { categories: CategoryType[] }) => {
  const { selectedGroup } = useGroupContext();
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [linkedCategories, setLinkedCategories] = useState<CategoryType[]>([]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => !category.groups?.some((group) => group.id === selectedGroup.id));
  }, [selectedGroup, categories]);

  const existingCategories = useMemo(() => {
    if (selectedGroup.id) {
      return categories.filter((category) => category.groups?.some((group) => group.id === selectedGroup.id));
    }
  }, [selectedGroup, categories]);

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
  };

  const handleDelete = (category: CategoryType) => {
    const cs = linkedCategories.filter((c) => c.id !== category.id);
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
                {filteredCategories.map((category) => (
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
                <GroupCategoriesListItem key={category.id} category={category} removeAction={handleDelete} />
              ))}
              {existingCategories?.map((category: CategoryType) => (
                <GroupCategoriesListItem key={category.id} category={category} removeAction={handleDelete} />
              ))}
            </List>
          </Stack>
        </PaperContainer>
      )}
    </>
  );
};

export default GroupCategoriesList;
