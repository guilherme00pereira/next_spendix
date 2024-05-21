import { Grid } from "@mui/material";
import CategoryTransactionsTable from "@/app/components/dashboard/tables/CategoryTransactionsTable";
import { getTransactionsByCategoriesLastSixMonths } from "@/app/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories, getSingleCategory } from "@/app/lib/supabase/methods/categories";
import ApexCategoryTransactionsPerPeriodLineChart from "@/app/components/dashboard/charts/ApexCategoryTransactionsPerPeriodLineChart";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { Stack } from "@mui/system";

async function fetchSpendingsCategories() {
  const res = await getCategories();
  return res.filter((category: CategoryType) => category.type === "Despesa");
} 

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const category = await getSingleCategory(params.slug);
  const title = category.name;
  const transactions = await getTransactionsByCategoriesLastSixMonths(category.id) as TransactionType[];
  const spendingsCategories = await fetchSpendingsCategories();

  return (
    <PageContainer title={`Categoria ${title}`}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          {transactions && <CategoryTransactionsTable transactions={transactions} />}
        </Grid>
        <Grid item xs={12} md={6}>
          {transactions.length > 0 && (
            <ApexCategoryTransactionsPerPeriodLineChart
              transactions={transactions}
              categories={spendingsCategories}
            />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CategoryPage;
