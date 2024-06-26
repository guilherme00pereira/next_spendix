import { Suspense } from "react";
import Stack from "@mui/material/Stack";
import { getCategoriesWithStats, getExpenseCategoriesTransactionsSum } from "@/app/lib/supabase/methods/categories";
import { CategoryWithStatsType } from "@/types/entities";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import ChooseIconDialog from "@/app/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/app/components/dashboard/lists/CategoriesList";
import CategoriesPageProvider from "@/app/lib/providers/CategoriesPageProvider";
import CategoriesChartPaper from "@/app/components/dashboard/surfaces/chart-papers/CategoriesChartPaper";
import CategoriesChartPaperLoader from "@/app/components/dashboard/loaders/CategoriesChartPaperLoader";
import CategoriesListPaperLoader from "@/app/components/dashboard/loaders/CategoriesListPaperLoader";
import dayjs from "dayjs";
import { ChartBarType } from "@/types/chart-types";
import SettingsProvider from "@/app/lib/providers/SettingsProvider";
import SettingsRightDrawer from "@/app/components/dashboard/drawers/SettingsRightDrawer";
import SelectableCategories from "@/app/components/dashboard/drawers/content/SelectableCategories";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";

async function fetchChartData(startDate: string, endDate: string) {
  const res = await getExpenseCategoriesTransactionsSum(startDate, endDate);
  //const items = res.filter((item: any) => !excludedCategories.includes(item.id));
  const data: ChartBarType[] = res
    .sort((a: ChartBarType, b: ChartBarType) => a.value - b.value)
    .reverse()
    .map((item: ChartBarType) => {
      return {
        name: item.name,
        value: item.value,
        label: "R$" + item.value.toFixed(2),
      };
    });
  return data;
}

const CategoriesPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const categories = await getCategoriesWithStats();
  const startDate = searchParams.date
    ? dayjs(searchParams.date as string)
        .startOf("M")
        .format("YYYY-MM-DD")
    : dayjs().startOf("M").format("YYYY-MM-DD");
  const endDate = searchParams.date
    ? dayjs(searchParams.date as string)
        .endOf("M")
        .format("YYYY-MM-DD")
    : dayjs().endOf("M").format("YYYY-MM-DD");
  const chartData = await fetchChartData(startDate, endDate);
  const actualMonthName = dayjs().format("MMMM");

  return (
    <PageContainer title="Categorias" showSelectMonthYear breadcrumb={<Breadcrumbs steps={[{title: "Categorias"}]} />} >
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
          <SettingsProvider>
            <Suspense fallback={<CategoriesChartPaperLoader />}>
              <CategoriesChartPaper title={`Despesas por categorias no mês ${actualMonthName}`} data={chartData} />
              {categories && (
                <SettingsRightDrawer title="Categorias a exibir">
                  <SelectableCategories categories={categories as CategoryWithStatsType[]} />
                </SettingsRightDrawer>
              )}
            </Suspense>
          </SettingsProvider>
        </Stack>
        <ChooseIconDialog />
      </CategoriesPageProvider>
    </PageContainer>
  );
};

export default CategoriesPage;
