"use client";
import { Stack, Container, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCreditCardPaymentMethods } from "@/lib/supabase/methods/payment-methods";
import CreditCardWidget from "@/components/dashboard/widgets/CreditCardWidget";
import AddNewPaymentMethodWidget from "@/components/dashboard/widgets/AddNewPaymentMethodWidget";
import CreditCardDialog from "@/components/dashboard/dialogs/CreditCardDialog";
import { usePageContext } from "@/lib/hooks";
import PageTitle from "@/components/dashboard/PageTitle";
import WalletItemsLoader from "@/components/dashboard/loaders/WalletItemsLoader";

const CreditCardsPage = () => {
  const {showModal} = usePageContext();

  const { data: payment_methods, isLoading } = useQuery({
    queryKey: ["credit_cards"],
    queryFn: () => getCreditCardPaymentMethods(),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <PageTitle title="Cartões de Crédito" />
        <Paper>
          <Stack direction="row" justifyContent="center" flexWrap="wrap" sx={{ p: 2 }}>
          {isLoading && <WalletItemsLoader />}
            {isLoading || (
              <>
                {payment_methods &&
                  payment_methods.map((payment_method: any) => <CreditCardWidget key={payment_method.id} cc={payment_method.credit_cards} />)}
                <AddNewPaymentMethodWidget />
              </>
            )}
          </Stack>
        </Paper>
      </Stack>
      {showModal && <CreditCardDialog />}
      
    </Container>
  );
};

export default CreditCardsPage;
