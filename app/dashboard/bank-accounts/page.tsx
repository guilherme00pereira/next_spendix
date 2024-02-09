'use client'
import {Stack, Container, Typography} from "@mui/material";

const BankAccountsPage = () => {

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
              Cartões de Crédito
          </Typography>
        </Stack>
        
      </Stack>
    </Container>
    );
};

export default BankAccountsPage;