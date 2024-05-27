import Stack from "@mui/material/Stack";
import { getTransactionsByCategoriesLastSixMonths } from "@/app/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories, getSingleCategory } from "@/app/lib/supabase/methods/categories";
import CategoryTransactionsTable from "@/app/components/dashboard/tables/CategoryTransactionsTable";
import ApexTransactionsTotalPerPeriodBarChart from "@/app/components/dashboard/charts/ApexTransactionsTotalPerPeriodBarChart";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CategoryDetailProvider from "@/app/lib/providers/CategoryDetailProvider";
import CategoryDetailsPageSelect from "@/app/components/dashboard/surfaces/CategoryDetailsPageSelect";
import PageTopCard from "@/app/components/dashboard/surfaces/PageTopCard";

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
        <PageTopCard>
          <CategoryDetailsPageSelect categories={spendingsCategories} />
        </PageTopCard>
        <Stack direction={{xs: "column", md: "row"}} justifyContent="center" alignItems="start" spacing={2}>
            {transactions.length > 0 && <ApexTransactionsTotalPerPeriodBarChart transactions={transactions} />}
            {transactions && <CategoryTransactionsTable transactions={transactions} />}
        </Stack>
      </CategoryDetailProvider>
    </PageContainer>
  );
};

export default CategoryPage;
