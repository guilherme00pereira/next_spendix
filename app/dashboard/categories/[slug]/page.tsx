import Stack from "@mui/material/Stack";
import { getTransactionsByCategoriesLastYear } from "@/app/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories, getSingleCategory } from "@/app/lib/supabase/methods/categories";
import CategoryTransactionsTable from "@/app/components/dashboard/tables/CategoryTransactionsTable";
import ApexTransactionsTotalPerPeriodBarChart from "@/app/components/dashboard/charts/ApexTransactionsTotalPerPeriodBarChart";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CategoryDetailProvider from "@/app/lib/providers/CategoryDetailProvider";
import CategoryDetailsPageSelect from "@/app/components/dashboard/widgets/selects/CategoryDetailsPageSelect";
import PageTopCard from "@/app/components/dashboard/surfaces/PageTopCard";
import { Suspense } from "react";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";

const CategoryPage = async ({ params }: { params: { slug: string; id: number } }) => {
  const category = await getSingleCategory(params.slug);
  const transactions = (await getTransactionsByCategoriesLastYear(category.id)) as TransactionType[];
  const spendingsCategories = await getCategories();

  return (
    <Suspense fallback={<p>loading</p>}>
      <PageContainer title="" breadcrumb={<Breadcrumbs steps={[{ title: "Categorias", href: "/dashboard/categories" }, { title: category.name }]} />}>
        <CategoryDetailProvider>
          <PageTopCard>
            <CategoryDetailsPageSelect categories={spendingsCategories.filter((category: CategoryType) => category.type === "Despesa")} />
          </PageTopCard>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="start" spacing={2} sx={{ width: "100%" }}>
            {transactions.length > 0 && <ApexTransactionsTotalPerPeriodBarChart transactions={transactions} />}
            {transactions && <CategoryTransactionsTable transactions={transactions} />}
          </Stack>
        </CategoryDetailProvider>
      </PageContainer>
    </Suspense>
  );
};

export default CategoryPage;
