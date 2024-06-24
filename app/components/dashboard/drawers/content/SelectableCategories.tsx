"use client";
import React, { useState } from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { CategoryType, CategoryWithStatsType } from "@/types/entities";
import CategoriesMultiSelect from "@/app/components/dashboard/widgets/selects/CategoriesMultiSelect";
import CheckableCategoriesListItem from "@/app/components/dashboard/lists/items/CheckableCategoriesListItem";

const SelectableCategories = ({ categories }: { categories: CategoryWithStatsType[] }) => {
  const [linkedCategories, setLinkedCategories] = useState<CategoryType[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const handleLinkedDelete = (category: CategoryType) => {
    const cs = linkedCategories.filter((c) => c.id !== category.id);
    setLinkedCategories(cs);
  };

  return (
    <>
      <Stack>
        <CategoriesMultiSelect
          categories={categories}
          setLinkedCategories={setLinkedCategories}
          setHasChanges={setHasChanges}
        />
      </Stack>
      <Stack direction="column" justifyContent="center">
        <List>
          {linkedCategories.map((category) => (
            <CheckableCategoriesListItem key={category.id} category={category} removeAction={handleLinkedDelete} />
          ))}
        </List>
      </Stack>
    </>
  );
};

export default SelectableCategories;
