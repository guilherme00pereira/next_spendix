"use client";
import { useState } from "react";
import { Stack, Container, Typography, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAccountPaymentMethods } from "@/lib/supabase/methods/payment-methods";
import BankAccountWidget from "@/components/dashboard/widgets/BankAccountWidget";
import AddNewPaymentMethodWidget from "@/components/dashboard/widgets/AddNewPaymentMethodWidget";
import BankAccountDialog from "@/components/dashboard/dialogs/BankAccountDialog";
import { BankAccountFormData } from "@/types/entities";

const BankAccountsPage = () => {
  const [editableAccount, setEditableAccount] = useState<BankAccountFormData>({
    id: 0,
    bank: "",
    balance: 0,
    color: "#000",
  });
  
  const { data: payment_methods, isLoading } = useQuery({
    queryKey: ["bank_accounts"],
    queryFn: () => getAccountPaymentMethods(),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Contas Bancárias</Typography>
        </Stack>
        <Paper>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 2 }}>
            {isLoading && <Typography variant="h6">Carregando...</Typography>}
            {isLoading || (
              <>
                {payment_methods &&
                  payment_methods.map((payment_method: any) => (
                    <BankAccountWidget key={payment_method.id} account={payment_method.accounts} action={setEditableAccount} />
                    ))}
                <AddNewPaymentMethodWidget />
                <BankAccountDialog account={editableAccount} />
              </>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default BankAccountsPage;
