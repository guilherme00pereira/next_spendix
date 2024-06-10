import React from 'react';
import { PaperContainer } from '@/app/components/dashboard/commonStyledComponents';
import PaperHeader from '@/app/components/dashboard/surfaces/PaperHeader';
import Skeleton from '@mui/material/Skeleton';
import RepeatableLoader from '../RepeatableLoader';

const CategoriesListPaperLoader = () => {
    return (
        <PaperContainer width="40%">
            <PaperHeader title="Loading..." />
            <RepeatableLoader items={3} width={400} height={100} />
        </PaperContainer>
    );
};

export default CategoriesListPaperLoader;