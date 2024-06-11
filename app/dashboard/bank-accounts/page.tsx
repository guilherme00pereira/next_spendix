import React, { Suspense } from "react";
import type { Metadata } from "next";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import Stack from "@mui/material/Stack";
import AccountsList from "@/app/components/dashboard/lists/AccountsList";
import PageProvider from "@/app/lib/providers/PageProvider";
import BankAccountDialog from "@/app/components/dashboard/dialogs/BankAccountDialog";
import BankAccountProvider from "@/app/lib/providers/BankAccountProvider";
import {getAccountPaymentMethods} from "@/app/lib/supabase/methods/payment-methods";

export const metadata: Metadata = {
  title: "Spdx - Accounts",
  description: "",
};

const BankAccountsPage = async () => {
  const accounts = await getAccountPaymentMethods();
  return (
    <PageContainer title="Contas Bancárias">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="start" spacing={2} sx={{ width: "100%" }}>
        <PageProvider>
          <BankAccountProvider>
            <Suspense fallback={<p>loading...</p>}>
              <AccountsList accounts={accounts} />
            </Suspense>
            <BankAccountDialog />
          </BankAccountProvider>
        </PageProvider>
      </Stack>
    </PageContainer>
  );
};

export default BankAccountsPage;
