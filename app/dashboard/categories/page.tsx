import Stack from "@mui/material/Stack";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import { CategoryType } from "@/types/entities";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import ChooseIconDialog from "@/app/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/app/components/dashboard/lists/CategoriesList";
import CategoriesPageProvider from "@/app/lib/providers/CategoriesPageProvider";
import CategoriesChartPaper from "@/app/components/dashboard/surfaces/chart-papers/CategoriesChartPaper";
import { ChartBarType } from "@/types/chart-types";
import { getExpenseCategoriesTransactionsSum } from "@/app/lib/supabase/methods/categories";
import dayjs from "dayjs";

const excludedCategories = [2, 43, 63];

async function fetchChartData() {
  const res = await getExpenseCategoriesTransactionsSum(dayjs().startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"));
  const items = res.filter((item: any) => !excludedCategories.includes(item.id));
  const data: ChartBarType[] = items
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

const CategoriesPage = async () => {
  const categories = await getCategories();
  const chartData = await fetchChartData();

  return (
    <PageContainer title="Categorias">
      <CategoriesPageProvider>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="start" spacing={2} sx={{ width: "100%" }}>
          {categories && <CategoriesList categories={categories as CategoryType[]} />}
          <CategoriesChartPaper title="Despesas por categorias no mês" data={chartData} />
        </Stack>
        <ChooseIconDialog />
      </CategoriesPageProvider>
    </PageContainer>
  );
};

export default CategoriesPage;
