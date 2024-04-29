import Grid from "@mui/material/Grid";
import { getCategories } from "@/lib/supabase/methods/categories";
import { CategoryType } from "@/types/entities";
import PageContainer from "@/components/dashboard/page/PageContainer";
import ChooseIconDialog from "@/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/components/dashboard/lists/CategoriesList";
import CategoryProvider from "@/components/context-providers/CategoryProvider";
import ParentCategoriesChartPaper from "@/components/dashboard/surfaces/ParentCategoriesChartPaper";

async function fetchCategories() {
  const res = await getCategories();
  return res;
}

const CategoriesPage = async () => {
  const categories = await fetchCategories();

  return (
    <PageContainer title="Categorias">
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <CategoryProvider>
              {categories && (
                <CategoriesList categories={categories as CategoryType[]} />
              )}
          </CategoryProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <ParentCategoriesChartPaper />
        </Grid>
      </Grid>
      <ChooseIconDialog />
    </PageContainer>
  );
};

export default CategoriesPage;
