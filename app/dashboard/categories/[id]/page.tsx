'use client'
import {useEffect, useState} from "react";
import { styled } from "@mui/material/styles";
import { Stack, Container, Typography, Paper, Box } from "@mui/material";
import CategoryDetailsTable from "@/components/dashboard/tables/CategoryDetailsTable";
import {getTransactionsByCategoriesLastSixMonths} from "@/lib/supabase/methods/transactions";
import {TransactionType} from "@/types/entities";
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/lib/supabase/methods/categories";
import CategoryTransactionsSixMonthsLineChart
  from "@/components/dashboard/charts/CategoryTransactionsSixMonthsLineChart";

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  marginTop: "8px",
}));

const CategoryPage = ({params}: {params: {id:number}}) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [childrenNames, setChildrenNames] = useState<string[]>([])
  const [title, setTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
      setIsLoading(true)
      getCategories().then((categories) => {
        const ids = categories.filter(c => c.parent === 50).map(c => c.id);
        setChildrenNames(categories.filter(c => c.parent === 50).map(c => c.name));
        const title = categories.filter(c => c.id === params.id).map(c => c.name);
        setTitle(title[0]);
        ids.push(params.id);
        getTransactionsByCategoriesLastSixMonths(ids).then((data) => {
          setTransactions(data as TransactionType[]);
        });
        setIsLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack justifyContent="space-between" alignItems="start" sx={{ mb: 2 }}>
          <Typography variant="h5" color="primary">
            Categoria: {title && title}
          </Typography>
          {childrenNames.length > 0 && (
            <Subtitle variant="h6">
              Subcategorias: {childrenNames.join(', ')}
            </Subtitle>
          )}
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          {transactions && <CategoryTransactionsSixMonthsLineChart transactions={transactions} />}
        </Stack>
        <Paper>
          <Box flexWrap="wrap" sx={{ p: 2 }}>
            {isLoading || (
              <>
                {transactions && CategoryDetailsTable({transactions: transactions})}
              </>
            )}
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CategoryPage;
