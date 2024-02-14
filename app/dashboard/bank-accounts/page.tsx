'use client'
import {Stack, Container, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getAccountPaymentMethods} from "@/lib/supabase/methods/payment-methods";

const BankAccountsPage = () => {
  const {data: payment_methods, isLoading} = useQuery({
    queryKey: ["bank_accounts"],
    queryFn: () => getAccountPaymentMethods(),
  });

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
              Contas Bancárias
          </Typography>
        </Stack>
        {isLoading && <Typography variant="h6">Carregando...</Typography>}
        {isLoading ||
          (payment_methods && payment_methods.map((payment_method: any) => {
            return (
              <Typography key={payment_method.accounts.id} variant="h6">
                {payment_method.accounts.bank}
              </Typography>
            );
          }))}
      </Stack>
    </Container>
    );
};

export default BankAccountsPage;