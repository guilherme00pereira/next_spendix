'use client'
import { Box, Container, Typography } from "@mui/material";
import TableCategories from "@/components/dashboard/tables/TableCategories";
import Stack from "@mui/material/Stack";
import CategoryRightPanel from "@/components/dashboard/panels/CategoryRightPanel";

const CategoriesPage = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{mb: 2}}>
          <Typography variant="h5" textAlign="center">
              Categorias
          </Typography>
      </Box>
      <Stack spacing={2} direction={{xs: "column", md: "row"}} justifyContent="space-between">
        <TableCategories />
        <CategoryRightPanel />
      </Stack>
    </Container>
  );
};

export default CategoriesPage;