import React, { Suspense } from "react";
import type { Metadata } from "next";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AccountsList from "@/app/components/dashboard/lists/AccountsList";
import PageProvider from "@/app/lib/providers/PageProvider";
import BankAccountDialog from "@/app/components/dashboard/dialogs/BankAccountDialog";
import BankAccountProvider from "@/app/lib/providers/BankAccountProvider";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Spdx - Accounts",
  description: "",
};

const BankAccountsPage = () => {
  return (
    <PageContainer title="Contas Bancárias">
      <Stack spacing={3} direction="row" justifyContent="center">
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={5}>
            <PageProvider>
              <BankAccountProvider>
                <Suspense fallback={<Loading />}>
                  <AccountsList />
                </Suspense>
                <BankAccountDialog />
              </BankAccountProvider>
            </PageProvider>
          </Grid>
          <Grid item xs={12} md={7}></Grid>
        </Grid>
      </Stack>
    </PageContainer>
  );
};

export default BankAccountsPage;
