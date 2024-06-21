"use client";
import React, { useEffect } from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { CategoryWithStatsType } from "@/types/entities";
import { Stack } from "@mui/system";
import CategoriesListItem from "./items/CategoriesListItem";
import { useCategoriesPageContext, useCategoryContext } from "@/app/lib/contexts";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import CategoriesFilter from "@/app/components/dashboard/widgets/filters/CategoriesFilter";
import CategoryProvider from "@/app/lib/providers/CategoryProvider";

const CategoriesList = ({ categories }: { categories: CategoryWithStatsType[] }) => {
  const { openConfirm, setOpenConfirm, removableObject } = useCategoryContext();
  const [filterableCategories, setFilterableCategories] = React.useState<CategoryWithStatsType[]>(categories);
  const { showCategoriesChart } = useCategoriesPageContext();

  const searchCategory = (search: string) => {
    if (search === "") {
      setFilterableCategories(categories);
    } else {
      setFilterableCategories(categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())));
    }
  };

  const handleProceedDelete = () => {
    fetch(`/api/categories/remove?id=${removableObject.id}`, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        setOpenConfirm(false);
      }
    });
  };

  return (
    <CategoryProvider>
      <PaperContainer width={showCategoriesChart ? "60%" : "90%"}>
        <PaperHeader title="Lista de categorias">
          <CategoriesFilter action={searchCategory} />
        </PaperHeader>
        <Stack>
          {filterableCategories.length > 0 &&
            filterableCategories.map((category) => (
              <CategoriesListItem key={category.id} category={category} />
            ))}
        </Stack>
        <ConfirmDeleteDialog
          entity={removableObject}
          open={openConfirm}
          handleClose={setOpenConfirm}
          handleDelete={handleProceedDelete}
        />
      </PaperContainer>
    </CategoryProvider>
  );
};

export default CategoriesList;
