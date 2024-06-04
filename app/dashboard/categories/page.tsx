import Stack from "@mui/material/Stack";
import { getCategoriesWithStats } from "@/app/lib/supabase/methods/categories";
import { CategoryWithStatsType } from "@/types/entities";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import ChooseIconDialog from "@/app/components/dashboard/dialogs/ChooseIconDialog";
import CategoriesList from "@/app/components/dashboard/lists/CategoriesList";
import CategoriesPageProvider from "@/app/lib/providers/CategoriesPageProvider";
import CategoriesChartPaper from "@/app/components/dashboard/surfaces/chart-papers/CategoriesChartPaper";
import { ChartBarType } from "@/types/chart-types";
import { getExpenseCategoriesTransactionsSum } from "@/app/lib/supabase/methods/categories";
import dayjs from "dayjs";

const excludedCategories = [2, 43, 63];

async function fetchChartData(startDate: string, endDate: string) {
  const res = await getExpenseCategoriesTransactionsSum(startDate, endDate);
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

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
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
    <PageContainer title="Categorias" showSelectMonthYear>
      <CategoriesPageProvider>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="start" spacing={2} sx={{ width: "100%" }}>
          {categories && <CategoriesList categories={categories as CategoryWithStatsType[]} />}
          <CategoriesChartPaper title={`Despesas por categorias no mês ${actualMonthName}`} data={chartData} />
        </Stack>
        <ChooseIconDialog />
      </CategoriesPageProvider>
    </PageContainer>
  );
};

export default CategoriesPage;
