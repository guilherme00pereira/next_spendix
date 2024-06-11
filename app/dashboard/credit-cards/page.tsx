import { Stack } from "@mui/material";
import CreditCardDialog from "@/app/components/dashboard/dialogs/CreditCardDialog";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CreditCardProvider from "@/app/lib/providers/CreditCardProvider";
import CreditCardsList from "@/app/components/dashboard/lists/CreditCardsList";
import { getCreditCardPaymentMethods } from "@/app/lib/supabase/methods/payment-methods";
import CreditCardInvoicesList from "@/app/components/dashboard/lists/CreditCardInvoicesList";
import { Suspense } from "react";
import CreditCardPaperLoader from "@/app/components/dashboard/loaders/CreditCardPaperLoader";

const CreditCardsPage = async () => {
  const cards = await getCreditCardPaymentMethods();
  //TODO: lista invoices seguind lógica dos grupos
  //TODO: editar cartão de crédito
  return (
    <PageContainer title="Cartão de Crédito">
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="start"
        alignItems="start"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <CreditCardProvider>
          <Suspense fallback={<CreditCardPaperLoader />}>
            <CreditCardsList cards={cards} />
          </Suspense>
          <CreditCardInvoicesList />
          <CreditCardDialog />
        </CreditCardProvider>
      </Stack>
    </PageContainer>
  );
};

export default CreditCardsPage;
