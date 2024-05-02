import { Stack, Grid } from "@mui/material";
import CreditCardDialog from "@/app/components/dashboard/dialogs/CreditCardDialog";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import CreditCardProvider from "@/app/lib/providers/CreditCardProvider";
import CreditCardsList from "@/app/components/dashboard/lists/CreditCardsList";

const CreditCardsPage = () => {
  return (
    <PageContainer title="Cartão de Crédito">
      <Stack spacing={3} direction="row" justifyContent="center">
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={5}>
          <CreditCardProvider>
            <CreditCardsList />
            <CreditCardDialog />
          </CreditCardProvider>
          </Grid>
          <Grid item xs={12} md={7}></Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default CreditCardsPage;
