'use client'
import {Stack, Container, Typography} from "@mui/material";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getCreditCardPaymentMethods} from "@/lib/supabase/methods/payment-methods";

const CreditCardsPage = () => {
  const {data: payment_methods, isLoading} = useQuery({
    queryKey: ["credit_cards"],
    queryFn: () => getCreditCardPaymentMethods(),
  });

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
              Cartões de Crédito
          </Typography>
        </Stack>
        {isLoading && <Typography variant="h6">Carregando...</Typography>}
        {isLoading ||
          (payment_methods && payment_methods.map((payment_method: any) => {
          return (
            <Typography key={payment_method.credit_cards.id} variant="h6">
              {payment_method.credit_cards.name}
            </Typography>
          );
        }))}
      </Stack>
    </Container>
    );
};

export default CreditCardsPage;