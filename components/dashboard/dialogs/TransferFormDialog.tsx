import React from 'react';
import { useSpeedDialStore } from '@/lib/contexts';
import { Dialog, DialogContent, Grid, MenuItem, TextField } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as yup from "yup";
import { useFormik } from "formik";
import TopBarDialog from './TopBarDialog';
import Stack from '@mui/system/Stack';
import { buildSelectPaymentMethods } from '@/lib/functions';

const validate = yup.object({
  outcomeId: yup.string().required("Campo obrigatório"),
  incomeId: yup.string().required("Campo obrigatório"),
  amount: yup.number().required("Campo obrigatório"),
});

const TransferFormDialog = () => {
  const queryClient = useQueryClient();
  const { showTransferDialog, actionShowTransferDialog, transfer} = useSpeedDialStore();

  const {data: paymentMethods} = useQuery({
    queryKey: ["payment_methods"],
    queryFn: () => buildSelectPaymentMethods(),
  });

  const formik = useFormik({
    initialValues: {
      outcomeId: "",
      outcomeType: "",
      incomeId: "",
      incomeType: "",
      amount: 0,
    },
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //TODO: handle payment methods changes to set types
  //TODO: handle submit

  return (
    <Dialog open={showTransferDialog} fullWidth maxWidth="md" onClose={() => actionShowTransferDialog(!showTransferDialog)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
      <TopBarDialog title="Nova transferência" />
      <DialogContent>
          <Stack direction="row">
            <Grid container spacing={3}>
              <Grid xs={12} md={4} item>
                <TextField
                  helperText={formik.touched.outcomeId && formik.errors.outcomeId}
                  error={formik.touched.outcomeId && Boolean(formik.errors.outcomeId)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.outcomeId}
                  select
                  fullWidth
                  name="outcomeId"
                  label="Saída"
                  children={paymentMethods && paymentMethods.map((payment_method: any) => (
                    <MenuItem key={payment_method.value} value={payment_method.value}>
                      {payment_method.label}
                    </MenuItem>
                  ))}
                />
              </Grid>
              <Grid xs={12} md={4} item>
              <TextField
                  helperText={formik.touched.incomeId && formik.errors.incomeId}
                  error={formik.touched.incomeId && Boolean(formik.errors.incomeId)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.incomeId}
                  select
                  fullWidth
                  name="incomeId"
                  label="Entrada"
                  children={paymentMethods && paymentMethods.map((payment_method: any) => (
                    <MenuItem key={payment_method.value} value={payment_method.value}>
                      {payment_method.label}
                    </MenuItem>
                  ))}
                />
                   
              </Grid>
              <Grid xs={12} md={4} item>
                <TextField
                  helperText={formik.touched.amount && formik.errors.amount}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  fullWidth
                  name="amount"
                  label="Valor"
                  type="number"
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TransferFormDialog;
