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
import {addTransaction, editTransaction} from "@/lib/supabase/methods/transactions";
import {getCategories} from "@/lib/supabase/methods/categories";
import {useSpeedDialStore} from "@/lib/hooks";
import {useQuery} from "@tanstack/react-query";
import TopBarDialog from "@/components/dashboard/dialogs/TopBarDialog";
import {convertPaymentMethodsToSelect} from "@/lib/functions";
import {getAllPaymentMethods} from "@/lib/supabase/methods/payment-methods";

const validate = yup.object({
  amount: yup.number().min(1, "Insira apenas valores maiores que 1").typeError("não é um número válido").required("Campo obrigatório"),
  category_id: yup.string().required("Campo obrigatório"),
  cashed: yup.boolean(),
  description: yup.string(),
  due_date: yup.date().required("Campo obrigatório"),
  payment_date: yup.date().nullable(),
  payed_amount: yup.number().nullable(),
  payment_method_id: yup.string(),
  payment_id: yup.string().nullable(),
  in_installments: yup.boolean(),
  installments: yup.number().min(2, "Insira apenas valores maiores que 2"),
});

const TransactionFormDialog = () => {
  const {showTransactionDialog, actionShowTransactionDialog, transaction} = useSpeedDialStore();
  const [isCashed, setIsCashed] = useState<boolean>(true);
  const [hasInstallments, setHasInstallments] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {data: categories} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const {data: paymentMethods} = useQuery({
    queryKey: ["payment_methods"],
    queryFn: () => buildSelectPaymentMethods(),
  });

  const buildSelectPaymentMethods = async () => {
    const res = await getAllPaymentMethods();
    return convertPaymentMethodsToSelect(res);
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("amount", e.target.value);
    formik.setFieldValue("payed_amount", e.target.value)
  }

  const handleDueDateChange = (value: any) => {
    formik.setFieldValue("due_date", value);
    formik.setFieldValue("payment_date", value);
  }

  const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInstallments(e.target.checked);
    formik.setFieldValue("recurring", e.target.checked);
  };

  const handleCashedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCashed(e.target.checked);
    formik.setFieldValue("cashed", e.target.checked);
  }


  const formik = useFormik({
    initialValues: transaction,
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
        }).then(res => {
          if(res !== null) {
            actionShowTransactionDialog(false);
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
        }).then(res => {
          if (res !== null) {
            actionShowTransactionDialog(false);
            setIsPending(false);

          }
        });
      }
    },
  });

  return (
    <Dialog open={showTransactionDialog} fullScreen onClose={() => actionShowTransactionDialog(!showTransactionDialog)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarDialog title="Novo lançamento"/>
        <DialogContent>
          {isPending && (
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
                      onChange={handleDueDateChange}
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
                  <Grid item xs={12} md={2}>
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
                          {paymentMethods && paymentMethods.map((payment_method: any) => (
                              <MenuItem key={payment_method.value} value={payment_method.value}>
                                {payment_method.label}
                              </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                </>
              )}
            </Grid>
          </Stack>


            <Stack direction="row" sx={{py: 2}}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={2}>
                  <FormControlLabel
                    control={<Checkbox name="in_installments" value={formik.values.in_installments}
                                       onChange={handleRecurringChange} onBlur={formik.handleBlur}/>}
                    label="É Parcelado?"
                  />
                </Grid>

                {hasInstallments && (
                  <Grid item xs={12} md={2}>
                    <TextField
                      helperText={formik.touched.installments && formik.errors.installments}
                      error={formik.touched.installments && Boolean(formik.errors.installments)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.installments}
                      fullWidth
                      name="installments"
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