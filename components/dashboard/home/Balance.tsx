import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getSumIncomeTransactions} from "@/lib/supabase/methods/transactions";
import {getFisrtDayOfMonth, getLasDayOfMonth} from "@/lib/functions";
import {Grid, Paper} from "@mui/material";


const Balance = () => {
    const { data: income, isLoading, isError, error } = useQuery({
        queryKey: ["sum-income"],
        queryFn: () => getSumIncomeTransactions(getFisrtDayOfMonth(), getLasDayOfMonth()),
    });

    return (
        <Grid item xs={12} md={4}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
            >
                {isLoading ? 'Carregando...' : 0}
                {isError ? error.message : ""}
            </Paper>
        </Grid>
    );
};

export default Balance;