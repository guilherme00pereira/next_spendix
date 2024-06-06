"use client";
import React, { useEffect } from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { CategoryWithStatsType } from "@/types/entities";
import { Stack } from "@mui/system";
import CategoriesListItem from "./items/CategoriesListItem";
import { useCategoriesPageContext, useCategoryContext } from "@/app/lib/contexts";
import { removeCategory } from "@/app/lib/supabase/methods/categories";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import CategoriesFilter from "@/app/components/dashboard/widgets/filters/CategoriesFilter";
import CategoryProvider from "@/app/lib/providers/CategoryProvider";
import { ShowChart } from "@mui/icons-material";

const CategoriesList = ({ categories }: { categories: CategoryWithStatsType[] }) => {
  const { openConfirm, setOpenConfirm, removableObject } = useCategoryContext();
  const [filterableCategories, setFilterableCategories] = React.useState<CategoryWithStatsType[]>(categories);
  const { showChart } = useCategoriesPageContext();

  const searchCategory = (search: string) => {
    if (search === "") {
      setFilterableCategories(categories);
    } else {
      setFilterableCategories(categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())));
    }
  };

  useEffect(() => {
    console.log(filterableCategories.filter((c) => c.active));
  }, []);

  return (
    <CategoryProvider>
      <PaperContainer width={showChart ? "60%" : "90%"}>
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
          handleDelete={() => {
            removeCategory(removableObject.id);
            setOpenConfirm(false);
          }}
        />
      </PaperContainer>
    </CategoryProvider>
  );
};

export default CategoriesList;
