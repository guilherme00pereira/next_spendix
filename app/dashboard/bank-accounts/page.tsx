"use client";
import {useState} from "react";
import {Stack, Container, Skeleton, Paper} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getAccountPaymentMethods} from "@/lib/supabase/methods/payment-methods";
import BankAccountWidget from "@/components/dashboard/widgets/BankAccountWidget";
import AddNewPaymentMethodWidget from "@/components/dashboard/widgets/AddNewPaymentMethodWidget";
import BankAccountDialog from "@/components/dashboard/dialogs/BankAccountDialog";
import {BankAccountFormData} from "@/types/entities";
import {BankAccountContext} from "@/lib/hooks";
import PageTitle from "@/components/dashboard/PageTitle";

const BankAccountsPage = () => {
  const [editableAccount, setEditableAccount] = useState({} as BankAccountFormData);

  const {data: payment_methods, isLoading} = useQuery({
    queryKey: ["bank_accounts"],
    queryFn: () => getAccountPaymentMethods(),
  });

  return (
    <BankAccountContext.Provider value={{editableAccount: editableAccount, setEditableAccount: setEditableAccount}}>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Stack>
          <PageTitle title="Contas Bancárias"/>
          <Paper>

            <Stack direction="row" justifyContent="center" flexWrap="wrap" sx={{p: 2}}>
              {isLoading && (
                <>
                  <Skeleton variant="rectangular" width={300} height={150} sx={{margin: "10px"}} animation="wave" />
                  <Skeleton variant="rectangular" width={300} height={150} sx={{margin: "10px"}} animation="wave" />
                  <Skeleton variant="rectangular" width={300} height={150} sx={{margin: "10px"}} animation="wave" />
                </>
              )}
              {isLoading || (
                <>
                  {payment_methods &&
                    payment_methods.map((payment_method: any) => (
                      <BankAccountWidget key={payment_method.id} account={payment_method.accounts}/>
                    ))}
                  <AddNewPaymentMethodWidget/>
                  <BankAccountDialog/>
                </>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </BankAccountContext.Provider>
  );
};

export default BankAccountsPage;
