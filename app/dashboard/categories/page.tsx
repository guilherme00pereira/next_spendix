"use client";
import {useState} from "react";
import {Box, Paper} from "@mui/material";
import CategoriesTable from "@/components/dashboard/tables/CategoriesTable";
import Stack from "@mui/material/Stack";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCategories, removeCategory} from "@/lib/supabase/methods/categories";
import {CategoryType} from "@/types/entities";
import CategoryTableLoader from "@/components/dashboard/loaders/CategoryTableLoader";
import ConfirmDeleteDialog from "@/components/dashboard/dialogs/ConfirmDeleteDialog";
import {useSpeedDialStore} from "@/lib/store";
import {IRemovableEntity} from "@/types/interfaces";
import PageTitle from "@/components/dashboard/PageTitle";
import PageContainer from "@/components/dashboard/PageContainer";

const CategoriesPage = () => {
  const queryClient = useQueryClient();
  const {actionShowCategoryDialog, setCategory} = useSpeedDialStore();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableCategory, setRemovableCategory] = useState<IRemovableEntity>({
    id: 0, name: '', type: 'categoria'
  });
  const [chosenCategory, setChosenCategory] = useState<number>(0);

  const {data: categories, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => removeCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']});
    },
  })

  const handleEdit = (id: number) => {
    actionShowCategoryDialog(true);
    const c = categories?.filter(category => category.id === id)[0] ?? {} as CategoryType;
    setCategory({
      id,
      name: c.name ?? "",
      type: c.type ?? "Receita",
      parent: c.parent ?? 0,
      color: c.color ?? null,
      icon: c.icon ?? null,
      slug: c.slug ?? "",
    })
  }

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableCategory({...removableCategory, id, name});
    setOpenConfirm(true);
  }

  const processDelete = () => {
    if (removableCategory.id > 0) {
      deleteMutation.mutate(removableCategory.id);
      setOpenConfirm(false);
    }
  }

  return (
    <PageContainer>
      <Stack>
      <PageTitle title="Categorias" />
      <Stack spacing={2} direction="row" justifyContent="start">
        <Paper sx={{width: "100%"}}>
          <Box p={2}>
            {isLoading && <CategoryTableLoader/>}
            {isLoading || (
              categories &&
              <CategoriesTable handleCategory={setChosenCategory} categories={categories as CategoryType[]}
                               handleConfirmDelete={handleConfirmDelete} handleEdit={handleEdit}/>

            )}
            <ConfirmDeleteDialog entity={removableCategory} open={openConfirm} handleClose={setOpenConfirm}
                                 handleDelete={processDelete}/>
        </Box>
      </Paper>
    </Stack>
    </Stack>
</PageContainer>
)
  ;
};

export default CategoriesPage;
