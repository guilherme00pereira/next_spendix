import Stack from "@mui/material/Stack";
import { getCategoriesWithStats } from "@/app/lib/supabase/methods/categories";
import { CategoryWithStatsType } from "@/types/entities";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import ChooseIconDialog from "@/app/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/app/components/dashboard/lists/CategoriesList";
import CategoriesPageProvider from "@/app/lib/providers/CategoriesPageProvider";
import CategoriesChartPaper from "@/app/components/dashboard/surfaces/chart-papers/CategoriesChartPaper";
import { Suspense } from "react";
import CategoriesChartPaperLoader from "@/app/components/dashboard/loaders/containers/CategoriesChartPaperLoader";
import CategoriesListPaperLoader from "@/app/components/dashboard/loaders/containers/CategoriesListPaperLoader";


const CategoriesPage = async () => {
  const categories = await getCategoriesWithStats();

  return (
    <PageContainer title="Categorias" showSelectMonthYear>
      <CategoriesPageProvider>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="start"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Suspense fallback={<CategoriesListPaperLoader />}>
            <CategoriesList categories={categories as CategoryWithStatsType[]} />
          </Suspense>
          <Suspense fallback={<CategoriesChartPaperLoader />}>
            <CategoriesChartPaper />
          </Suspense>
        </Stack>
        <ChooseIconDialog />
      </CategoriesPageProvider>
    </PageContainer>
  );
};

export default CategoriesPage;
