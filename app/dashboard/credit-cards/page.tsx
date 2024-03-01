"use client";
import { Stack, Container, Typography, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCreditCardPaymentMethods } from "@/lib/supabase/methods/payment-methods";
import CreditCardWidget from "@/components/dashboard/widgets/CreditCardWidget";

const CreditCardsPage = () => {
  const { data: payment_methods, isLoading } = useQuery({
    queryKey: ["credit_cards"],
    queryFn: () => getCreditCardPaymentMethods(),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Cartões de Crédito</Typography>
        </Stack>
        <Paper>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 2 }}>
            {isLoading && <Typography variant="h6">Carregando...</Typography>}
            {isLoading ||
              (payment_methods && payment_methods.map((payment_method: any) => <CreditCardWidget key={payment_method.id} account={payment_method.credit_cards} />))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CreditCardsPage;
