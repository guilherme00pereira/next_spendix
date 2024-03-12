"use client";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Container, Typography, Paper, Box, TextField, MenuItem, FormControl } from "@mui/material";
import CategoryDetailsTable from "@/components/dashboard/tables/CategoryDetailsTable";
import { getTransactionsByCategoriesLastSixMonths } from "@/lib/supabase/methods/transactions";
import { CategoryType, TransactionType } from "@/types/entities";
import { getCategories } from "@/lib/supabase/methods/categories";
import CategoryTransactionsSixMonthsLineChart from "@/components/dashboard/charts/CategoryTransactionsSixMonthsLineChart";
import { useRouter } from "next/navigation";

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  marginTop: "8px",
}));

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [childrenNames, setChildrenNames] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [spendingsCategories, setSpendingsCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((categories) => {
      const currId = categories.filter((c) => c.slug === params.slug).map((c) => c.id)[0];
      const ids = categories.filter((c) => c.parent === currId).map((c) => c.id);
      setChildrenNames(categories.filter((c) => c.parent === currId).map((c) => c.name));
      const title = categories.filter((c) => c.id === currId).map((c) => c.name);
      setTitle(title[0]);
      ids.push(currId);
      getTransactionsByCategoriesLastSixMonths(ids).then((data) => {
        setTransactions(data as TransactionType[]);
      });
      setIsLoading(false);
      setSpendingsCategories(categories.filter((c) => c.type === "Despesa"));
    });
  }, []);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value;
    router.push(`/dashboard/categories/${categoryId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack sx={{ width: "75%" }}>
            <Typography variant="h2" fontSize="1.5em" color="primary">
              Categoria: {title}
            </Typography>
            {childrenNames.length > 0 && <Subtitle variant="h6">Subcategorias: {childrenNames.join(", ")}</Subtitle>}
          </Stack>
          <Box sx={{ width: "25%" }}>
            <FormControl fullWidth>
              <TextField
                select
                name="category_id"
                label="Trocar categoria: "
                size="small"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSelect(e)}
              >
                {spendingsCategories?.map((category) => (
                  <MenuItem key={category.id} value={category.slug}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Paper sx={{ width: "50%" }}>
            <Box flexWrap="wrap" sx={{ p: 2 }}>
              {isLoading || (transactions && CategoryDetailsTable({ transactions: transactions }))}
            </Box>
          </Paper>
          <Paper sx={{ width: "45%" }}>{transactions.length > 0 && <CategoryTransactionsSixMonthsLineChart transactions={transactions} />}</Paper>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CategoryPage;
