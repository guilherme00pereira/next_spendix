'use client'
import { useState } from "react";
import { Stack, Container, Typography, Button, SvgIcon } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddNewCategoryDialog from "@/components/dashboard/modals/AddNewCategoryDialog";
import ListCategoriesTable from "@/components/dashboard/tables/ListCategoriesTable";

const CategoriesPage = () => {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [updateTable, setUpdateTable] = useState<boolean>(false);

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
                  onClick={() => setShowAdd(true)}
                >
                  Add
            </Button>
        </Stack>

          {showAdd && (
              <AddNewCategoryDialog toggle={showAdd} action={setShowAdd} dispatchTableUpdate={setUpdateTable} />
            )}
            <ListCategoriesTable />
      </Stack>
    </Container>
  );
};

export default CategoriesPage;