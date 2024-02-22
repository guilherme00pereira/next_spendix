'use client'
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import TableCategories from "@/components/dashboard/tables/TableCategories";
import Stack from "@mui/material/Stack";
import CategoryRightPanel from "@/components/dashboard/panels/CategoryRightPanel";

const CategoriesPage = () => {
  const [chosenCategory, setChosenCategory] = useState<number>(0);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{mb: 2}}>
          <Typography variant="h5" textAlign="center">
              Categorias
          </Typography>
      </Box>
      <Stack spacing={2} direction={{xs: "column", md: "row"}} justifyContent="space-between">
        <TableCategories handler={setChosenCategory} />
        {chosenCategory > 0 && (
          <CategoryRightPanel id={chosenCategory} />
        )}
      </Stack>
    </Container>
  );
};

export default CategoriesPage;