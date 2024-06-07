import { Stack } from "@mui/material";
import CreditCardDialog from "@/app/components/dashboard/dialogs/CreditCardDialog";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CreditCardProvider from "@/app/lib/providers/CreditCardProvider";
import CreditCardsList from "@/app/components/dashboard/lists/CreditCardsList";
import { getCreditCardPaymentMethods } from "@/app/lib/supabase/methods/payment-methods";

const CreditCardsPage = async () => {
  const cards = await getCreditCardPaymentMethods();
  
  return (
    <PageContainer title="Cartão de Crédito">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="start" spacing={2} sx={{ width: "100%" }}>
        <CreditCardProvider>
          <CreditCardsList cards={cards} />
          <CreditCardDialog />
        </CreditCardProvider>
      </Stack>
    </PageContainer>
  );
};

export default CreditCardsPage;
