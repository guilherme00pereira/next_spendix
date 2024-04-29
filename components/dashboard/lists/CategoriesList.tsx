'use client'
import React from "react";
import { PaperContainer } from "@/components/dashboard/commonStyledComponents";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import { ICategoryListProps } from "@/types/interfaces";
import { CategoryType } from "@/types/entities";
import { Stack } from "@mui/system";
import CategoriesListItem from "./items/CategoriesListItem";
import { useSpeedDialStore } from "@/lib/store";
import { useCategoryContext } from "@/lib/contexts";
import { removeCategory } from "@/lib/supabase/methods/categories";
import ConfirmDeleteDialog from "@/components/dashboard/dialogs/ConfirmDeleteDialog";

const RenderSubCategories = ({
  categories,
  handleEdit,
  handleConfirmDelete,
}: ICategoryListProps) => {
  return categories.map((category) => (
    <CategoriesListItem
      key={category.id}
      category={category}
      handleEdit={handleEdit}
      handleConfirmDelete={handleConfirmDelete}
      isSubCategory
    />
  ));
};

const CategoriesList = ({categories}: {categories: CategoryType[]}) => {
  const { actionShowCategoryDialog, setCategory } = useSpeedDialStore();
  const { openConfirm, setOpenConfirm, removableCategory, setRemovableCategory} = useCategoryContext();

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableCategory({ ...removableCategory, id, name });
    setOpenConfirm(true);
  };

  

  const handleEdit = (id: number) => {
    actionShowCategoryDialog(true);
    const c =
      categories?.filter((category) => category.id === id)[0] ??
      ({} as CategoryType);
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

  const getSubCategories = (id: number) => {
    const subs = categories?.filter((c) => {
      if (c.parent === id) {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          parent: c.parent ?? null,
          color: c.color ?? null,
          icon: c.icon ?? null,
        };
      }
    });
    return subs as CategoryType[];
  };

  return (
    <PaperContainer>
      <PaperHeader title="Lista de categorias" />
      <Stack>
        {categories.length > 0 &&
          categories
            ?.filter((c) => c.parent === null)
            .map((category) => (
              <>
                <CategoriesListItem
                  key={category.id}
                  category={category}
                  handleEdit={handleEdit}
                  handleConfirmDelete={handleConfirmDelete}
                />
                <RenderSubCategories
                  categories={getSubCategories(category.id)}
                  handleEdit={handleEdit}
                  handleConfirmDelete={handleConfirmDelete}
                />
              </>
            ))}
      </Stack>
      <ConfirmDeleteDialog
        entity={removableCategory}
        open={openConfirm}
        handleClose={setOpenConfirm}
        handleDelete={() => {
          removeCategory(removableCategory.id);
          setOpenConfirm(false);
        }}
      />
    </PaperContainer>
  );
};

export default CategoriesList;
