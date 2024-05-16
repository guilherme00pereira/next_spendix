import React, { useState } from "react";
import { Checkbox, FormControlLabel, Grid, MenuItem, Stack, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";
import { submitTransactionForm } from "@/app/lib/actions/transactions-actions";
import { useSpeedDialStore } from "@/app/lib/store";
import TopBarSpeedDialog from "./TopBarSpeedDialog";
import dayjs from "dayjs";
import { serializeToServeActions } from "@/app/lib/functions";
import { ISpeedDiaDialogsData } from "@/types/interfaces";

const validate = yup.object({
  amount: yup
    .number()
    .min(1, "Insira apenas valores maiores que 1")
    .typeError("não é um número válido")
    .required("Campo obrigatório"),
  category_id: yup.string().required("Campo obrigatório"),
  payment_date: yup.date().nullable(),
  payed_amount: yup.number().nullable(),
  payment_method_id: yup.string(),
  payment_id: yup.string().nullable(),
  draft: yup.boolean(),
});

const IncomeFormDialog = ({ categories, paymentMethods }: ISpeedDiaDialogsData) => {
  const { showIncomeDialog, actionShowIncomeDialog, income } = useSpeedDialStore();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleDateChange = (date: any) => {
    formik.setFieldValue("due_date", date);
  };

  const handleCashedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("cashed", event.target.checked);
    formik.setFieldValue("payment_date", event.target.checked ? new Date() : null);
    formik.setFieldValue("payed_amount", event.target.checked ? formik.values.amount : null);
  };

  const formik = useFormik({
    initialValues: income,
    validationSchema: validate,
    onSubmit: (values) => {
      setIsPending(true);
      const data = {
        ...values,
        due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
        payment_date: values.payment_date
          ? dayjs(values.payment_date).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      };
      submitTransactionForm(serializeToServeActions(data)).then(() => {
        setIsPending(false);
        actionShowIncomeDialog(false);
      });
    },
  });

  return (
    <Dialog open={showIncomeDialog} fullWidth maxWidth="md" onClose={() => actionShowIncomeDialog(!showIncomeDialog)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarSpeedDialog title="Receita" showDialog={showIncomeDialog} closeAction={actionShowIncomeDialog} />
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
                  onChange={formik.handleChange}
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
                  {categories
                    ?.filter((c) => c.type === "Receita")
                    .map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      onChange={(value) => handleDateChange(value)}
                      value={formik.values.due_date}
                      name="due_date"
                      label="Data de recebimento"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  helperText={formik.touched.payment_method_id && formik.errors.payment_method_id}
                  error={formik.touched.payment_method_id && Boolean(formik.errors.payment_method_id)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment_method_id}
                  select
                  fullWidth
                  name="payment_method_id"
                  label="Recebido por"
                >
                  {paymentMethods &&
                    paymentMethods.map((payment_method: any) => (
                      <MenuItem key={payment_method.value} value={payment_method.value}>
                        {payment_method.label}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
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

          <Stack direction="row" sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="draft"
                      value={formik.values.cashed}
                      onChange={(e) => handleCashedChange(e)}
                      checked={formik.values.cashed}
                    />
                  }
                  label="Recebido"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="draft"
                      value={formik.values.draft}
                      onChange={formik.handleChange}
                      checked={formik.values.draft}
                    />
                  }
                  label="Marcar como rascunho"
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default IncomeFormDialog;
