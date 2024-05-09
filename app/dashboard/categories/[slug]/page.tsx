import { Grid } from "@mui/material";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import { getTransactionsByCategoriesLastSixMonths } from "@/app/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories, getSingleCategory } from "@/app/lib/supabase/methods/categories";
import ApexCategoryTransactionsPerPeriodLineChart from "@/app/components/dashboard/charts/ApexCategoryTransactionsPerPeriodLineChart";
import PageContainer from "@/app/components/dashboard/page/PageContainer";

async function fetchCategoryData(slug: string) {
  const res = await getSingleCategory(slug);
  return res;
}

async function fetchRelatedTransactions(id: number) {
  const res = await getTransactionsByCategoriesLastSixMonths(id);
  return res as TransactionType[];
}

async function fetchSpendingsCategories() {
  const res = await getCategories();
  return res.filter((category: CategoryType) => category.type === "Despesa");
} 

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const category = await fetchCategoryData(params.slug);
  const title = category.name;
  const transactions = await fetchRelatedTransactions(category.id);
  const spendingsCategories = await fetchSpendingsCategories();

  return (
    <PageContainer title={`Categoria ${title}`}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          {transactions && TransactionsTable({ transactions: transactions })}
        </Grid>
        <Grid item xs={12} md={6}>
          {transactions.length > 0 && (
            <ApexCategoryTransactionsPerPeriodLineChart
              title={title}
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
