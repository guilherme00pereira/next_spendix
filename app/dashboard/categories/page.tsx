import Grid from "@mui/material/Grid";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import { CategoryType } from "@/types/entities";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import ChooseIconDialog from "@/app/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/app/components/dashboard/lists/CategoriesList";
import CategoryProvider from "@/app/lib/providers/CategoryProvider";
import ParentCategoriesChartPaper from "@/app/components/dashboard/surfaces/ParentCategoriesChartPaper";

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
          <ParentCategoriesChartPaper title="Despesas por categorias no mês" />
        </Grid>
      </Grid>
      <ChooseIconDialog />
    </PageContainer>
  );
};

export default CategoriesPage;
