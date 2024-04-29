"use client";
import { useState } from "react";
import { Stack, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCreditCardPaymentMethods } from "@/lib/supabase/methods/payment-methods";
import CreditCardWidget from "@/components/dashboard/widgets/payments/CreditCardWidget";
import AddNewPaymentMethodWidget from "@/components/dashboard/widgets/payments/AddNewPaymentMethodWidget";
import CreditCardDialog from "@/components/dashboard/dialogs/CreditCardDialog";
import PageTitle from "@/components/dashboard/page/PageTitle";
import RepeatableLoader from "@/components/dashboard/loaders/RepeatableLoader";
import { CreditCardType } from "@/types/entities";
import { CreditCardContext } from "@/lib/contexts";
import PageContainer from "@/components/dashboard/page/PageContainer";

const CreditCardsPage = () => {
  const [editableCard, setEditableCard] = useState({} as CreditCardType);

  const { data: payment_methods, isLoading } = useQuery({
    queryKey: ["credit_cards"],
    queryFn: () => getCreditCardPaymentMethods(),
  });

  return (
    <CreditCardContext.Provider
      value={{
        editableObject: editableCard,
        setEditableObject: setEditableCard,
      }}
    >
      <PageContainer title="Cartão de Crédito">
          <Paper>
            <Stack
              direction="row"
              justifyContent="center"
              flexWrap="wrap"
              sx={{ p: 2 }}
            >
              {isLoading && 
                <RepeatableLoader items={3} width={300} height={130} />
              }
              {isLoading || (
                <>
                  {payment_methods &&
                    payment_methods.map((payment_method: any) => (
                      <CreditCardWidget
                        key={payment_method.id}
                        cc={payment_method.credit_cards}
                      />
                    ))}
                  <AddNewPaymentMethodWidget width="280px" height="160px" />
                  <CreditCardDialog />
                </>
              )}
            </Stack>
          </Paper>
      </PageContainer>
    </CreditCardContext.Provider>
  );
};

export default CreditCardsPage;
