import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageContainer from '@/components/dashboard/page/PageContainer';

const CashFlowPage = () => {
    return (
        <PageContainer>
        <Box sx={{mb: 4}}>
            <Typography variant="h5" textAlign="center">
              Fluxo de Caixa
            </Typography>
        </Box>
            
        </PageContainer>
    );
};

export default CashFlowPage;