import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import RepeatableLoader from '@/app/components/dashboard/loaders/RepeatableLoader';

const TransactionsTopCardLoader = () => {
    return (<RepeatableLoader items={5} width={400} height={100} />);
};

export default TransactionsTopCardLoader;