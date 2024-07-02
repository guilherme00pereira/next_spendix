import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import { getTags } from "@/app/lib/supabase/methods/tags";
import { buildSelectPaymentMethods } from "@/app/lib/builders";
import TransactionPageForm from "@/app/components/dashboard/surfaces/TransactionPageForm";
import { TransactionFormData } from "@/types/entities";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";
import { Stack } from "@mui/system";

const NewTransactionPage = async () => {
  const transaction = {} as TransactionFormData;
  const categories = await getCategories();
  const tags = await getTags();
  const paymentMethods = await buildSelectPaymentMethods();

  return (
    <PageContainer title="Adicionar Despesa" breadcrumb={<Breadcrumbs steps={[{ title: "Adicionar despesa" }]} />}>
      <Stack spacing={2} direction="column" sx={{width: "100%"}}>
        <TransactionPageForm categories={categories} tags={tags} paymentMethods={paymentMethods} transaction={transaction} />
      </Stack>
    </PageContainer>
  );
};

export default NewTransactionPage;
