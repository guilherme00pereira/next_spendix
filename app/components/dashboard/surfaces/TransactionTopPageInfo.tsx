import React from 'react';
import Grid from "@mui/material/Grid";
import SelectMonthYear from "@/app/components/dashboard/calendar/SelectMonthYear";
import TransactionsTotalsWidget from "@/app/components/dashboard/widgets/transactions/TransactionsTotalsWidget";
import { ITransactionTopPageInfoProps } from '@/types/interfaces';

const TransactionTopPageInfo = ({income, spendings, showDataSelector}: ITransactionTopPageInfoProps) => {
    return (
        <Grid container spacing={1} sx={{alignItems: "center"}}>
          <Grid item xs={12} sm={3}>
            { showDataSelector && <SelectMonthYear /> } 
          </Grid>
          <Grid item xs={12} sm={3}>
            <TransactionsTotalsWidget
              value={income}
              title="Total de receitas"
              income={true}
              color="success.dark"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TransactionsTotalsWidget value={spendings} title="Total de gastos" income={false} color="error.dark" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TransactionsTotalsWidget
              value={income - spendings}
              title="Saldo"
              income={true}
              color="text.primary"
            />
          </Grid>
        </Grid>
    );
};

export default TransactionTopPageInfo;