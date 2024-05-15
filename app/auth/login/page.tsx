import React from 'react';
import Container from "@mui/material/Container";
import AuthContainer from '@/app/components/auth/AuthContainer';

const LoginPage = () => {
    return (
        <Container component="main" sx={styles.container} maxWidth={false}>
            <AuthContainer />;
        </Container>
    )
};

export default LoginPage;

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
  }