import React from 'react';
import { PaperContainer } from '@/app/components/dashboard/commonStyledComponents';
import PageContainer from '@/app/components/dashboard/page/PageContainer';
import { getCategories } from '@/app/lib/supabase/methods/categories';
import { getTags } from '@/app/lib/supabase/methods/tags';
import { buildSelectPaymentMethods } from '@/app/lib/builders';
import TransactionPageForm from '@/app/components/dashboard/surfaces/TransactionPageForm';
import { TransactionFormData } from '@/types/entities';
import Breadcrumbs from '@/app/components/dashboard/widgets/Breadcrumbs';

const NewTransactionPage = async () => {
    const transaction = {} as TransactionFormData;
    const categories = await getCategories();
    const tags = await getTags();
    const paymentMethods = await buildSelectPaymentMethods();

    return (
        <PageContainer title="Nova transação" breadcrumb={<Breadcrumbs steps={[{ title: "Nova transação" }]} />}>
            <PaperContainer sx={{ p: 2 }}>
                <TransactionPageForm categories={categories} tags={tags} paymentMethods={paymentMethods} transaction={transaction} />
            </PaperContainer>
        </PageContainer>
    );
};

export default NewTransactionPage;