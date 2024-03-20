import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CashFlowPage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{mb: 4}}>
            <Typography variant="h5" textAlign="center">
              Fluxo de Caixa
            </Typography>
        </Box>
            
        </Container>
    );
};

export default CashFlowPage;