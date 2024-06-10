import React from 'react';
import { PaperContainer } from '@/app/components/dashboard/commonStyledComponents';
import PaperHeader from '@/app/components/dashboard/surfaces/PaperHeader';
import Skeleton from '@mui/material/Skeleton';

const CategoriesChartPaperLoader = () => {
    return (
        <PaperContainer width="40%">
            <PaperHeader title="Loading..." />
            <Skeleton
                variant="rectangular"
                height={400}
                sx={{ margin: "10px" }}
                animation="wave"
            />
        </PaperContainer>
    );
};

export default CategoriesChartPaperLoader;