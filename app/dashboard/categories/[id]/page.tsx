'use client'
import React from "react";
import { Stack, Container, Typography, Paper, Box } from "@mui/material";
import { getCategoryLastSixMonthsTransactions } from "@/lib/supabase/methods/categories";
import { useQuery } from "@tanstack/react-query";
import CategoryDetailsTable from "@/components/dashboard/tables/CategoryDetailsTable";

const CategoryPage = ({params}: {params: {id:number}}) => {
    
    const {data: category_transactions, isLoading} = useQuery({
        queryKey: ["category_transactions_six", params.id],
        queryFn: () => getCategoryLastSixMonthsTransactions(params.id),
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
            Categoria: {category_transactions && category_transactions[0]?.categories?.name}  
          </Typography>
        </Stack>
        <Paper>
          <Box flexWrap="wrap" sx={{ p: 2 }}>
            {isLoading || (
              <>
                {category_transactions && CategoryDetailsTable({transactions: category_transactions})}
              </>
            )}
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CategoryPage;
