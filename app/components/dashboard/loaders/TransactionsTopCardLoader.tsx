import React from 'react';
import RepeatableLoader from '@/app/components/dashboard/loaders/RepeatableLoader';

const TransactionsTopCardLoader = () => {
    return (<RepeatableLoader items={4} width={400} height={100} />);
};

export default TransactionsTopCardLoader;