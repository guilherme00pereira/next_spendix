import { Stack } from "@mui/material";
import CreditCardDialog from "@/app/components/dashboard/dialogs/CreditCardDialog";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CreditCardProvider from "@/app/lib/providers/CreditCardProvider";
import CreditCardsList from "@/app/components/dashboard/lists/CreditCardsList";
import CreditCardInvoicesList from "@/app/components/dashboard/lists/CreditCardInvoicesList";
import { Suspense } from "react";
import CreditCardPaperLoader from "@/app/components/dashboard/loaders/CreditCardPaperLoader";
import { getCreditCards } from "@/app/lib/supabase/methods/credit-cards";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";

const CreditCardsPage = async () => {
  const cards = await getCreditCards();
  
  return (
    <PageContainer title="Cartão de Crédito" breadcrumb={<Breadcrumbs steps={[{title: "Cartões de Crédito"}]} />}>
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
