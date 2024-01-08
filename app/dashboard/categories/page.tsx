'use client'
import {usePageContext} from "@/lib/hooks";
import { Stack, Container, Typography, Button, SvgIcon } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CategoryFormDialog from "@/components/dashboard/modals/CategoryFormDialog";
import ListCategoriesTable from "@/components/dashboard/tables/ListCategoriesTable";

const CategoriesPage = () => {
  const {showModal, actionShowModal} = usePageContext();

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
                  onClick={() => actionShowModal(true)}
                >
                  Add
            </Button>
        </Stack>

          {showModal && (
              <CategoryFormDialog />
            )}
            <ListCategoriesTable />
      </Stack>
    </Container>
  );
};

export default CategoriesPage;