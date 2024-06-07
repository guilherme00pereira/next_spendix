import React, { useState } from "react";
import { Grid, MenuItem, Stack, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSpeedDialStore } from "@/app/lib/store";
import TopBarSpeedDialog from "./TopBarSpeedDialog";
import dayjs from "dayjs";
import { submitTransactionForm } from "@/app/lib/actions/transactions-actions";
import { serializeToServeActions } from "@/app/lib/functions";
import { ISpeedDiaDialogsData } from "@/types/interfaces";

const validate = yup.object({
  amount: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido").required("Campo obrigatório"),
  category_id: yup.string().required("Campo obrigatório"),
  description: yup.string(),
  due_date: yup.date().required("Campo obrigatório"),
  recurring: yup.boolean(),
  recurring_times: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido"),
});

const RecurringFormDialog = ({ categories }: ISpeedDiaDialogsData) => {
  const { showRecurringDialog, actionShowRecurringDialog, recurring } = useSpeedDialStore();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("amount", e.target.value);
    formik.setFieldValue("payed_amount", e.target.value);
  };

  const handleDueDateChange = (value: any) => {
    formik.setFieldValue("due_date", value);
    formik.setFieldValue("payment_date", value);
  };

  const formik = useFormik({
    initialValues: {
      ...recurring,
      due_date: dayjs(recurring.due_date),
      payment_date: dayjs(),
    },
    validationSchema: validate,
    onSubmit: (values) => {
      setIsPending(true);
      const data = {
        ...values,
        due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
        payment_date: dayjs(values.due_date).format("YYYY-MM-DD"),
        payed_amount: values.amount,
      };
      submitTransactionForm(serializeToServeActions(data)).then(() => {
        setIsPending(false);
        actionShowRecurringDialog(false);
      });
    },
  });

  return (
    <Dialog open={showRecurringDialog} fullWidth maxWidth="md" onClose={() => actionShowRecurringDialog(!showRecurringDialog)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarSpeedDialog title="Novo lançamento recorrente" showDialog={showRecurringDialog} closeAction={actionShowRecurringDialog} />
        <DialogContent>
          {isPending && (
            <Stack sx={{ width: "100%", pb: 3 }} spacing={2}>
              <LinearProgress />
            </Stack>
          )}
          <Stack direction="row">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  helperText={formik.touched.amount && formik.errors.amount}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  onChange={handleAmountChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  fullWidth
                  name="amount"
                  label="Valor"
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  helperText={formik.touched.category_id && formik.errors.category_id}
                  error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category_id}
                  select
                  fullWidth
                  name="category_id"
                  label="Categoria"
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.type} - {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
                    <DatePicker format="DD/MM/YYYY" onChange={handleDueDateChange} value={formik.values.due_date} name="due_date" label="Vencimento" />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              
            </Grid>
          </Stack>

          <Stack direction="row" sx={{pt: 2}}>
            <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
                <TextField
                  helperText={formik.touched.recurring_times && formik.errors.recurring_times}
                  error={formik.touched.recurring_times && Boolean(formik.errors.recurring_times)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.recurring_times}
                  fullWidth
                  name="recurring_times"
                  label="Nº de recorrências"
                />
              </Grid>
              
              <Grid item xs={12} md={8}>
                <TextField
                  helperText={formik.touched.description && formik.errors.description}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  fullWidth
                  name="description"
                  label="Descrição"
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RecurringFormDialog;
