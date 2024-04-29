"use client";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Typography, Paper, Box, Grid } from "@mui/material";
import TransactionsTable from "@/components/dashboard/tables/TransactionsTable";
import { getTransactionsByCategoriesLastSixMonths } from "@/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories } from "@/lib/supabase/methods/categories";
import ApexCategoryTransactionsSixMonthsLineChart from "@/components/dashboard/charts/ApexCategoryTransactionsPerPeriodLineChart";
import PageContainer from "@/components/dashboard/page/PageContainer";

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  marginTop: "8px",
}));

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [childrenNames, setChildrenNames] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [spendingsCategories, setSpendingsCategories] = useState<
    CategoryType[]
  >([]);

  useEffect(() => {
    getCategories().then((categories) => {
      const currId = categories
        .filter((c) => c.slug === params.slug)
        .map((c) => c.id)[0];
      const ids = categories
        .filter((c) => c.parent === currId)
        .map((c) => c.id);
      setChildrenNames(
        categories.filter((c) => c.parent === currId).map((c) => c.name)
      );
      const title = categories
        .filter((c) => c.id === currId)
        .map((c) => c.name);
      setTitle(title[0]);
      ids.push(currId);
      getTransactionsByCategoriesLastSixMonths(ids).then((data) => {
        setTransactions(data as TransactionType[]);
      });
      setSpendingsCategories(categories.filter((c) => c.type === "Despesa"));
    });
  }, []);

  return (
    <PageContainer title={`Categoria ${title}`}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          {transactions && TransactionsTable({ transactions: transactions })}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            {transactions.length > 0 && (
              <ApexCategoryTransactionsSixMonthsLineChart
                transactions={transactions}
                categories={spendingsCategories}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CategoryPage;
