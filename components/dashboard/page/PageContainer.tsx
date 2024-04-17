import Container from '@mui/material/Container';
import React from 'react';

const PageContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {children}
        </Container>
    );
};

export default PageContainer;