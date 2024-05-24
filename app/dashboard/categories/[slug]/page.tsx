import { Grid } from "@mui/material";
import { getTransactionsByCategoriesLastSixMonths } from "@/app/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories, getSingleCategory } from "@/app/lib/supabase/methods/categories";
import CategoryTransactionsTable from "@/app/components/dashboard/tables/CategoryTransactionsTable";
import ApexTransactionsTotalPerPeriodBarChart from "@/app/components/dashboard/charts/ApexTransactionsTotalPerPeriodBarChart";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CategoryDetailProvider from "@/app/lib/providers/CategoryDetailProvider";
import CategoryDetailsPageSelect from "@/app/components/dashboard/surfaces/CategoryDetailsPageSelect";

async function fetchSpendingsCategories() {
  const res = await getCategories();
  return res.filter((category: CategoryType) => category.type === "Despesa");
}

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const category = await getSingleCategory(params.slug);
  const title = category.name;
  const transactions = (await getTransactionsByCategoriesLastSixMonths(category.id)) as TransactionType[];
  const spendingsCategories = await fetchSpendingsCategories();

  

  return (
    <PageContainer title={`Categoria ${title}`}>
      <CategoryDetailProvider>
        <CategoryDetailsPageSelect categories={spendingsCategories} />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            {transactions && <CategoryTransactionsTable transactions={transactions} />}
          </Grid>
          <Grid item xs={12} md={6}>
            {transactions.length > 0 && <ApexTransactionsTotalPerPeriodBarChart transactions={transactions} />}
          </Grid>
        </Grid>
      </CategoryDetailProvider>
    </PageContainer>
  );
};

export default CategoryPage;
