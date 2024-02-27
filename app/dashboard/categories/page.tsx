"use client";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import CategoriesTable from "@/components/dashboard/tables/CategoriesTable";
import Stack from "@mui/material/Stack";
import CategoriesPanel from "@/components/dashboard/panels/CategoriesPanel";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/supabase/methods/categories";

const CategoriesPage = () => {
  const [chosenCategory, setChosenCategory] = useState<number>(0);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Categorias</Typography>
      </Box>
      <Stack spacing={2} direction={{ xs: "column", lg: "row" }} justifyContent="space-between">
        {categories && <CategoriesTable handleCategory={setChosenCategory} categories={categories} isLoading={isLoading} />}
        {categories && <CategoriesPanel id={chosenCategory} action={setChosenCategory} />}
      </Stack>
    </Container>
  );
};

export default CategoriesPage;
