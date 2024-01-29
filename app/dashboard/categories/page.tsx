'use client'
import React, {useState} from 'react';
import {usePageContext} from "@/lib/hooks";
import { Stack, Container, Typography, Button, SvgIcon } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CategoryFormDialog from "@/components/dashboard/modals/CategoryFormDialog";
import ListCategoriesTable from "@/components/dashboard/tables/ListCategoriesTable";
import {CategoryForm} from "@/types/entities";

const CategoriesPage = () => {
  const {showModal, actionShowModal} = usePageContext();
  const [editableCategory, setEditableCategory] = useState<CategoryForm>({id: 0, name: '', type: 'Receita'});

  const handleAddNew = () => {
    actionShowModal(true);
    setEditableCategory({id: 0, name: '', type: 'Receita'});
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
              Categorias
          </Typography>
          <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <AddRoundedIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddNew}
                >
                  Add
            </Button>
        </Stack>

          {showModal && (
              <CategoryFormDialog category={editableCategory} />
            )}
            <ListCategoriesTable handler={setEditableCategory} />
      </Stack>
    </Container>
  );
};

export default CategoriesPage;