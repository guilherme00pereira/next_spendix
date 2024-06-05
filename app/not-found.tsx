import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { color } from '@mui/system';

const PageNotFound = () => {
    return (
        <Container component="main" sx={styles.container} maxWidth={false}>
            <Typography variant="h1" sx={styles.title}>404</Typography>
            <Typography variant='body1' sx={styles.paragraph}>Oops 😭,The page you are looking for is not available.</Typography>
            <Button variant="text" color="primary" href="/dashboard">
                Voltar para o Dashboard
            </Button>
        </Container>
    );
};

export default PageNotFound;

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: "#F0F1F7",
    },
    title: {
      textAlign: 'center',
      mb: 2,
      color: "#845ADF"
    },
    paragraph: {
        textAlign: 'center',
        mb: 2,
        color: "#58607B"
      },
  }