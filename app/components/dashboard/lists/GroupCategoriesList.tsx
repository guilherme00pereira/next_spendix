"use client";
import React, { useMemo, useState, useTransition } from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { useGroupContext } from "@/app/lib/contexts";
import { CategoryType } from "@/types/entities";
import CheckableCategoriesListItem from "./items/CheckableCategoriesListItem";
import CategoriesMultiSelect from "../widgets/selects/CategoriesMultiSelect";
import { Button } from "@mui/material";
import { deleteGroupCategoryRelation, submitGroupCategories } from "@/app/lib/actions/group-actions";

const GroupCategoriesList = ({ categories }: { categories: CategoryType[] }) => {
  const { selectedGroup } = useGroupContext();
  const [linkedCategories, setLinkedCategories] = useState<CategoryType[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPending, startTransition] = useTransition();
  //TODO: delete and save status with useOptimistic or useTransition

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => !category.groups?.some((group) => group.id === selectedGroup.id));
  }, [selectedGroup, categories]);

  const existingCategories = useMemo(() => {
    if (selectedGroup.id) {
      return categories.filter((category) => category.groups?.some((group) => group.id === selectedGroup.id));
    }
  }, [selectedGroup, categories]);

  const handleLinkedDelete = (category: CategoryType) => {
    const cs = linkedCategories.filter((c) => c.id !== category.id);
    setLinkedCategories(cs);
  };

  const handleExistingDelete = (category: CategoryType) => {
    deleteGroupCategoryRelation(selectedGroup.id, category.id).then((res) => {
      setHasChanges(false);
    });
  };

  const handleSave = () => {
    startTransition(() => {
      submitGroupCategories(
        selectedGroup.id,
        linkedCategories.map((c) => c.id)
      ).then((res) => {
        setLinkedCategories([]);
        setHasChanges(false);
      });
    });
  };

  return (
    <>
      {selectedGroup.id && (
        <PaperContainer>
          <PaperHeader title={`Categorias em ${selectedGroup.name}`} />
          <CategoriesMultiSelect
            categories={filteredCategories}
            setLinkedCategories={setLinkedCategories}
            setHasChanges={setHasChanges}
          />
          <Stack direction="column" justifyContent="center">
            {isPending && "Salvando..."}
            {isPending || (
              <List>
                {linkedCategories.map((category) => (
                  <CheckableCategoriesListItem key={category.id} category={category} removeAction={handleLinkedDelete} />
                ))}
                {existingCategories?.map((category: CategoryType) => (
                  <CheckableCategoriesListItem key={category.id} category={category} removeAction={handleExistingDelete} />
                ))}
              </List>
            )}
            {hasChanges && (
              <Stack direction="row" alignItems="flex-end">
                <Button size="small" variant="contained" color="primary" onClick={handleSave} disabled={isPending}>
                  Salvar
                </Button>
              </Stack>
            )}
          </Stack>
        </PaperContainer>
      )}
    </>
  );
};

export default GroupCategoriesList;
