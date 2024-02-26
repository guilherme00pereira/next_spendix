'use client'
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import CategoriesTable from "@/components/dashboard/tables/CategoriesTable";
import Stack from "@mui/material/Stack";
import CategoryTransactionsPanel from "@/components/dashboard/panels/CategoryTransactionsPanel";
import ParentCategoriesPieChart from "@/components/dashboard/charts/ParentCategoriesPieChart";

const CategoriesPage = () => {
  const [chosenCategory, setChosenCategory] = useState<number>(0);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{mb: 2}}>
          <Typography variant="h5" textAlign="center">
              Categorias
          </Typography>
      </Box>
      <Stack spacing={2} direction={{xs: "column", lg: "row"}} justifyContent="space-between">
        <CategoriesTable handler={setChosenCategory} />
        {chosenCategory > 0 && (
          <CategoryTransactionsPanel id={chosenCategory} action={setChosenCategory} />
        )}
        {chosenCategory === 0 && (
            <ParentCategoriesPieChart />
        )}
      </Stack>
    </Container>
  );
};

export default CategoriesPage;