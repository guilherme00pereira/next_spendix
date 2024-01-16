import React, {useState} from "react";
import {Checkbox, FormControlLabel, Grid, MenuItem, Stack, TextField} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import {useFormik} from "formik";
import {TransactionForm} from "@/types/entities";
import {addTransaction, editTransaction} from "@/lib/supabase/methods/transactions";
import {getCategories} from "@/lib/supabase/methods/categories";
import {usePageContext} from "@/lib/hooks";
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import ModalTopBar from "@/components/dashboard/modals/ModalTopBar";

const validate = yup.object({
  amount: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido").required("Campo obrigatório"),
  category_id: yup.string().required("Campo obrigatório"),
  cashed: yup.boolean(),
  description: yup.string(),
  due_date: yup.date().required("Campo obrigatório"),
  payment_date: yup.date(),
  payed_amount: yup.number(),
  times: yup.number().min(2, "Insira apenas valores maiores que 2"),
  recurring: yup.boolean(),
});

const TransactionFormDialog = ({transaction}: { transaction: TransactionForm }) => {
  const queryClient = useQueryClient();
  const {showModal, actionShowModal} = usePageContext();
  const [isCashed, setIsCashed] = useState<boolean>(true);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  const {data: categories} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("amount", e.target.value);
    formik.setFieldValue("payed_amount", e.target.value)
  }

  const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRecurring(e.target.checked);
    formik.setFieldValue("recurring", e.target.checked);
  };

  const handleCashedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCashed(e.target.checked);
    formik.setFieldValue("cashed", e.target.checked);
  }

  const addMutation = useMutation({
    mutationFn: (values: TransactionForm) => addTransaction(values),
    onSuccess: () => {
      actionShowModal(!showModal);
      queryClient.invalidateQueries({queryKey: ["transactions"]});
    },
  });

  const editMutation = useMutation({
    mutationFn: (values: TransactionForm) => editTransaction(values),
    onSuccess: () => {
      actionShowModal(!showModal);
      queryClient.invalidateQueries({queryKey: ["transactions"]});
    },
  });

  const formik = useFormik({
    initialValues: transaction,
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values);
      if (values.id) {
        editMutation.mutate({
          id: values.id,
          amount: values["amount"],
          due_date: values["due_date"],
          description: values["description"],
          cashed: values["cashed"],
          category_id: values["category_id"],
          times: values["times"],
          recurring: values["recurring"],
          payment_date: values["payment_date"],
          payed_amount: values["payed_amount"]
        });
      } else {
        addMutation.mutate({
          amount: values["amount"],
          due_date: values["due_date"],
          description: values["description"],
          cashed: values["cashed"],
          category_id: values["category_id"],
          times: values["times"],
          recurring: values["recurring"],
          payment_date: values["payment_date"],
          payed_amount: values["payed_amount"]
        });
      }
    },
  });

  return (
    <Dialog open={showModal} fullScreen onClose={() => actionShowModal(!showModal)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <ModalTopBar title="Novo lançamento"/>
        <DialogContent>
          {addMutation.isPending && (
            <Stack sx={{width: "100%", pb: 3}} spacing={2}>
              <LinearProgress/>
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
                  <DemoContainer components={["DatePicker"]} sx={{pt: "0"}}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      onChange={(value) => formik.setFieldValue("due_date", value)}
                      value={formik.values.due_date}
                      name="due_date"
                      label="Vencimento"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" sx={{pt: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox name="cashed" onChange={handleCashedChange} onBlur={formik.handleBlur}
                              value={formik.values.cashed} defaultChecked={true}/>
                  }
                  label="Pago?"
                />
              </Grid>

              {isCashed && (
                <>
                  <Grid item xs={12} md={2}>
                    <TextField
                      helperText={formik.touched.payed_amount && formik.errors.payed_amount}
                      error={formik.touched.payed_amount && Boolean(formik.errors.payed_amount)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.payed_amount}
                      fullWidth
                      name="payed_amount"
                      label="Valor"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]} sx={{pt: "0"}}>
                        <DatePicker
                          format="DD/MM/YYYY"
                          onChange={(value) => formik.setFieldValue("payment_date", value)}
                          value={formik.values.payment_date}
                          name="payment_date"
                          label="Data de pagamento"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </>
              )}
            </Grid>
          </Stack>

          <Stack direction="row" sx={{py: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={<Checkbox name="recurring" value={formik.values.recurring}
                                     onChange={handleRecurringChange} onBlur={formik.handleBlur}/>}
                  label="Recorrente?"
                />
              </Grid>

              {isRecurring && (
                <Grid item xs={12} md={2}>
                  <TextField
                    helperText={formik.touched.times && formik.errors.times}
                    error={formik.touched.times && Boolean(formik.errors.times)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.times}
                    fullWidth
                    name="times"
                    label="Nº de parcelas"
                  />
                </Grid>
              )}
            </Grid>
          </Stack>

          <Stack direction="row">
            <Grid container spacing={2}>
              <Grid item xs={12}>
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

export default TransactionFormDialog;