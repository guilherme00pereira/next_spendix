"use client";
import {useState} from "react";
import {Stack, Paper} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getAccountPaymentMethods} from "@/lib/supabase/methods/payment-methods";
import BankAccountWidget from "@/components/dashboard/widgets/BankAccountWidget";
import AddNewPaymentMethodWidget from "@/components/dashboard/widgets/AddNewPaymentMethodWidget";
import BankAccountDialog from "@/components/dashboard/dialogs/BankAccountDialog";
import {BankAccountType} from "@/types/entities";
import {BankAccountContext} from "@/lib/hooks";
import PageTitle from "@/components/dashboard/page/PageTitle";
import RepeatableLoader from "@/components/dashboard/loaders/RepeatableLoader";
import PageContainer from "@/components/dashboard/page/PageContainer";

const BankAccountsPage = () => {
  const [editableAccount, setEditableAccount] = useState({} as BankAccountType);

  const {data: payment_methods, isLoading} = useQuery({
    queryKey: ["bank_accounts"],
    queryFn: () => getAccountPaymentMethods(),
  });

  return (
    <BankAccountContext.Provider value={{editableObject: editableAccount, setEditableObject: setEditableAccount}}>
      <PageContainer>
        <Stack>
          <PageTitle title="Contas Bancárias"/>
          <Paper>
            <Stack direction="row" justifyContent="center" flexWrap="wrap" sx={{p: 2}}>
              {isLoading && 
                <RepeatableLoader items={3} width={300} height={130} />
              }
              {isLoading || (
                <>
                  {payment_methods &&
                    payment_methods.map((payment_method: any) => (
                      <BankAccountWidget key={payment_method.id} account={payment_method.accounts}/>
                    ))}
                  <AddNewPaymentMethodWidget height="130px"/>
                  <BankAccountDialog/>
                </>
              )}
            </Stack>
          </Paper>
        </Stack>
      </PageContainer>
    </BankAccountContext.Provider>
  );
};

export default BankAccountsPage;
