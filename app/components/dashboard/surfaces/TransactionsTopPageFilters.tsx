'use client';
import React from 'react';
import Stack from '@mui/material/Stack';
import SelectMonthYear from '@/app/components/dashboard/calendar/SelectMonthYear';

const TransactionsTopPageFilters = () => {
    return (
        <Stack direction="row" justifyContent="center" width={{width: "80%"}}>
            <SelectMonthYear />
        </Stack>
    );
};

export default TransactionsTopPageFilters;