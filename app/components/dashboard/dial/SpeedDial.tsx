import React from 'react';
import SpeedDialMobile from '@/app/components/dashboard/dial/SpeedDialMobile';
import { getCategories } from '@/app/lib/supabase/methods/categories';
import { getTags } from '@/app/lib/supabase/methods/tags';
import { buildSelectPaymentMethods } from '@/app/lib/functions';

const SpeedDial = async() => {
    const categories = await getCategories();
    const tags = await getTags();
    const paymentMethods = await buildSelectPaymentMethods();
    
    
    return (
        <>
          {(categories && tags && paymentMethods) && <SpeedDialMobile categories={categories} tags={tags} paymentMethods={paymentMethods} />}  
        </>
    );
};

export default SpeedDial;