"use client";
import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { CategoryType } from "@/types/entities";
import { Stack } from "@mui/system";
import CategoriesListItem from "./items/CategoriesListItem";
import { useSpeedDialStore } from "@/app/lib/store";
import { useCategoryContext } from "@/app/lib/contexts";
import { removeCategory } from "@/app/lib/supabase/methods/categories";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import CategoriesFilter from "@/app/components/dashboard/widgets/filters/CategoriesFilter";

const CategoriesList = ({ categories }: { categories: CategoryType[] }) => {
  const { actionShowCategoryDialog, setCategory } = useSpeedDialStore();
  const { openConfirm, setOpenConfirm, removableObject, setRemovableObject } = useCategoryContext();
  const [filteredCategories, setFilteredCategories] = React.useState<CategoryType[]>(categories);

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableObject({ ...removableObject, id, name });
    setOpenConfirm(true);
  };

  const handleEdit = (id: number) => {
    actionShowCategoryDialog(true);
    const c = categories?.filter((category) => category.id === id)[0] ?? ({} as CategoryType);
    setCategory({
      id,
      name: c.name ?? "",
      type: c.type ?? "Receita",
      parent: c.parent ?? 0,
      color: c.color ?? null,
      icon: c.icon ?? null,
      slug: c.slug ?? "",
    });
  };

  const searchCategory = (search: string) => {
      if (search === "") {
        setFilteredCategories(categories);
      } else {
        setFilteredCategories(categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())));
      }
  };

  return (
    <PaperContainer>
      <PaperHeader title="Lista de categorias">
        <CategoriesFilter action={searchCategory} />
      </PaperHeader>
      <Stack>
        {filteredCategories.length > 0 &&
          filteredCategories
            .map((category) => (
                <CategoriesListItem
                  key={category.id}
                  category={category}
                  handleEdit={handleEdit}
                  handleConfirmDelete={handleConfirmDelete}
                />
            ))}
      </Stack>
      <ConfirmDeleteDialog
        entity={removableObject}
        open={openConfirm}
        handleClose={setOpenConfirm}
        handleDelete={() => {
          removeCategory(removableObject.id);
          setOpenConfirm(false);
        }}
      />
    </PaperContainer>
  );
};

export default CategoriesList;
