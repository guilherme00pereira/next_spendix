"use client";
import { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, removeCategory } from "@/lib/supabase/methods/categories";
import { CategoryType } from "@/types/entities";
import CategoryTableLoader from "@/components/dashboard/loaders/CategoryTableLoader";
import ConfirmDeleteDialog from "@/components/dashboard/dialogs/ConfirmDeleteDialog";
import { useSpeedDialStore } from "@/lib/store";
import { IRemovableEntity } from "@/types/interfaces";
import PageContainer from "@/components/dashboard/page/PageContainer";
import ApexParentCategoriesBarChart from "@/components/dashboard/charts/ApexParentCategoriesBarChart";
import ChooseIconDialog from "@/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/components/dashboard/lists/CategoriesList";

const CategoriesPage = () => {
  const queryClient = useQueryClient();
  const { actionShowCategoryDialog, setCategory } = useSpeedDialStore();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableCategory, setRemovableCategory] = useState<IRemovableEntity>({
    id: 0,
    name: "",
    type: "categoria",
  });
  const [chosenCategory, setChosenCategory] = useState<number>(0);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => removeCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

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

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableCategory({ ...removableCategory, id, name });
    setOpenConfirm(true);
  };

  const processDelete = () => {
    if (removableCategory.id > 0) {
      deleteMutation.mutate(removableCategory.id);
      setOpenConfirm(false);
    }
  };

  return (
    <PageContainer title="Categorias">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
              {isLoading && <CategoryTableLoader />}
              {isLoading ||
                (categories && (
                  <CategoriesList
                    handleCategory={setChosenCategory}
                    categories={categories as CategoryType[]}
                    handleConfirmDelete={handleConfirmDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              <ConfirmDeleteDialog entity={removableCategory} open={openConfirm} handleClose={setOpenConfirm} handleDelete={processDelete} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ApexParentCategoriesBarChart title="Despesas por categorias no mês" />
        </Grid>
      </Grid>
      <ChooseIconDialog />
    </PageContainer>
  );
};

export default CategoriesPage;
