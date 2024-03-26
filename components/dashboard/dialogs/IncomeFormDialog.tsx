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
import { addTransaction, editTransaction } from "@/lib/supabase/methods/transactions";
import { getCategories } from "@/lib/supabase/methods/categories";
import { useSpeedDialStore } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";
import TopBarSpeedDialog from "./TopBarSpeedDialog";
import { convertPaymentMethodsToSelect } from "@/lib/functions";
import { getAllPaymentMethods } from "@/lib/supabase/methods/payment-methods";

const validate = yup.object({
  amount: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido").required("Campo obrigatório"),
  category_id: yup.string().required("Campo obrigatório"),
  payment_date: yup.date().nullable(),
  payed_amount: yup.number().nullable(),
  payment_method_id: yup.string(),
  payment_id: yup.string().nullable(),
  draft: yup.boolean(),
});

const IncomeFormDialog = () => {
  const { showIncomeDialog, actionShowIncomeDialog, income } = useSpeedDialStore();
  const [isPending, setIsPending] = useState<boolean>(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const { data: paymentMethods } = useQuery({
    queryKey: ["payment_methods"],
    queryFn: () => buildSelectPaymentMethods(),
  });

  const buildSelectPaymentMethods = async () => {
    const res = await getAllPaymentMethods();
    return convertPaymentMethodsToSelect(res);
  };

  const formik = useFormik({
    initialValues: income,
    validationSchema: validate,
    onSubmit: (values) => {
      setIsPending(true);
      if (values.id) {
        editTransaction({
          id: values.id,
          amount: values["amount"],
          due_date: values["due_date"],
          description: values["description"],
          cashed: values["cashed"],
          category_id: values["category_id"],
          in_installments: values["in_installments"],
          installments: values["installments"],
          payment_date: values["payment_date"],
          payed_amount: values["payed_amount"],
          payment_method_id: values["payment_method_id"],
          payment_id: values["payment_id"],
          draft: values["draft"],
        }).then((res) => {
          if (res !== null) {
            actionShowIncomeDialog(false);
            setIsPending(false);
          }
        });
      } else {
        addTransaction({
          amount: values["amount"],
          due_date: values["due_date"],
          description: values["description"],
          cashed: values["cashed"],
          category_id: values["category_id"],
          in_installments: values["in_installments"],
          installments: values["installments"],
          payment_date: values["payment_date"],
          payed_amount: values["payed_amount"],
          payment_method_id: values["payment_method_id"],
          payment_id: null,
          draft: values["draft"],
        }).then((res) => {
          if (res !== null) {
            actionShowIncomeDialog(false);
            setIsPending(false);
          }
        });
      }
    },
  });

  return (
    <Dialog open={showIncomeDialog} fullWidth maxWidth="md" onClose={() => actionShowIncomeDialog(!showIncomeDialog)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarSpeedDialog title="Nova Receita" showDialog={showIncomeDialog} closeAction={actionShowIncomeDialog} />
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
                        {category.type} - {category.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
                    <DatePicker format="DD/MM/YYYY" onChange={(value) => formik.setFieldValue('due_date', value)} value={formik.values.due_date} name="due_date" label="Data de recebimento" />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  helperText={formik.touched.payment_method_id && formik.errors.payment_method_id}
                  error={formik.touched.payment_method_id && Boolean(formik.errors.payment_method_id)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment_method_id}
                  select
                  fullWidth
                  name="payment_method_id"
                  label="Meio de Pagamento"
                >
                  {paymentMethods &&
                    paymentMethods.map((payment_method: any) => (
                      <MenuItem key={payment_method.value} value={payment_method.value}>
                        {payment_method.label}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={<Checkbox name="draft" value={formik.values.draft} onChange={formik.handleChange} checked={formik.values.draft} />}
                  label="Marcar como previsto"
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
