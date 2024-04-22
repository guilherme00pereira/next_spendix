import React from "react";
import { PaperContainer } from "@/components/dashboard/commonStyledComponents";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import { ICategoryListProps } from "@/types/interfaces";
import { CategoryType } from "@/types/entities";
import { Stack } from "@mui/system";
import CategoriesListItem from "./items/CategoriesListItem";

const RenderSubCategories = ({
  handleCategory,
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

const CategoriesList = ({
  handleCategory,
  categories,
  handleEdit,
  handleConfirmDelete,
}: ICategoryListProps) => {
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

  const hasSubCategories = (id: number) => {
    return categories?.filter((c) => c.parent === id).length > 0;
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
                  handleCategory={handleCategory}
                  handleEdit={handleEdit}
                  handleConfirmDelete={handleConfirmDelete}
                />
              </>
            ))}
      </Stack>
    </PaperContainer>
  );
};

export default CategoriesList;
