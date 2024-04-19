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
import { addReccuringTransaction } from "@/lib/supabase/methods/transactions";
import { getCategories } from "@/lib/supabase/methods/categories";
import { useSpeedDialStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import TopBarSpeedDialog from "./TopBarSpeedDialog";

const validate = yup.object({
  amount: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido").required("Campo obrigatório"),
  category_id: yup.string().required("Campo obrigatório"),
  description: yup.string(),
  due_date: yup.date().required("Campo obrigatório"),
  recurring: yup.boolean(),
  recurring_times: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido"),
});

const RecurringFormDialog = () => {
  const { showRecurringDialog, actionShowRecurringDialog, recurring } = useSpeedDialStore();
  const [isPending, setIsPending] = useState<boolean>(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("amount", e.target.value);
    formik.setFieldValue("payed_amount", e.target.value);
  };

  const handleDueDateChange = (value: any) => {
    formik.setFieldValue("due_date", value);
    formik.setFieldValue("payment_date", value);
  };

  const formik = useFormik({
    initialValues: recurring,
    validationSchema: validate,
    onSubmit: (values) => {
      setIsPending(true);
      if (values.id) {
        console.log("edit recurring transaction");
      } else {
        addReccuringTransaction({
          amount: values["amount"],
          due_date: values["due_date"],
          description: values["description"],
          category_id: values["category_id"],
          recurring: values["recurring"],
          recurring_times: values["recurring_times"],
        }).then((res) => {
          if (res !== null) {
            actionShowRecurringDialog(false);
            setIsPending(false);
          }
        });
      }
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
