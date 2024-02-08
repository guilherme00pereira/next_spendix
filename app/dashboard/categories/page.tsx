'use client'
import { Stack, Container, Typography } from "@mui/material";
import ListCategoriesTable from "@/components/dashboard/tables/ListCategoriesTable";

const CategoriesPage = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
              Categorias
          </Typography>
        </Stack>
            <ListCategoriesTable />
      </Stack>
    </Container>
  );
};

export default CategoriesPage;