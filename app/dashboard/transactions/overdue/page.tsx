import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const OverduePage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{mb: 4}}>
            <Typography variant="h5" textAlign="center">
              Contas vencidas
            </Typography>
        </Box>
            
        </Container>
    );
};

export default OverduePage;