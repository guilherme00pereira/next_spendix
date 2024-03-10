'use client'
import {Container, Grid, Paper} from '@mui/material';
import React from "react";

const page = () => {
  return (
    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          Under development
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          {/*<Deposits />*/}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          {/*<Orders />*/}
        </Paper>
      </Grid>
    </Grid>
</Container>
)
  ;
};

export default page;