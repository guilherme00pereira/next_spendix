"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
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
import { serializeToServeActions } from "@/app/lib/functions";
import { submitTransactionForm } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import { ISpeedDiaDialogsData } from "@/types/interfaces";
import { CategoryType, TagType } from "@/types/entities";
import DialogActionButtons from "./DialogActionButtons";

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
});

//TODO: Adjust credit card or bank account balance when adding or updating a transaction
//TOD: hide installmennts when editing a transaction

const TransactionFormDialog = ({ categories, tags, paymentMethods }: ISpeedDiaDialogsData) => {
  const { showTransactionDialog, actionShowTransactionDialog, transaction } = useSpeedDialStore();
  const [isCashed, setIsCashed] = useState<boolean>(true);
  const [selectedTagsIds, setSelectedTagsIds] = useState<number[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("amount", e.target.value);
    formik.setFieldValue("payed_amount", e.target.value);
  };

  const handleDueDateChange = (value: any) => {
    formik.setFieldValue("due_date", value);
    formik.setFieldValue("payment_date", value);
  };

  const handleCashedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCashed(e.target.checked);
    formik.setFieldValue("cashed", e.target.checked);
  };

  const handleTagSelect = (e: SelectChangeEvent<unknown>) => {
    const values = e.target.value as number[];
    setSelectedTagsIds(values);
    formik.setFieldValue("tags", values);
  };

  const formik = useFormik({
    initialValues: {
      ...transaction,
      due_date: dayjs(transaction.due_date),
      payment_date: dayjs(),
    },
    validationSchema: validate,
    onSubmit: (values) => {
      setIsPending(true);
      const data = serializeToServeActions({
        ...values,
        due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
        payment_date: values.payment_date ? dayjs(values.payment_date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
        tags_ids: selectedTagsIds,
      });
      submitTransactionForm(data).then(() => {
        setIsPending(false);
        actionShowTransactionDialog(false);
      });
    },
  });

  return (
    <Dialog open={showTransactionDialog} fullWidth maxWidth="lg" onClose={() => actionShowTransactionDialog(!showTransactionDialog)}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
        {transaction.id ? "Editar" : "Adicionar"} despesa
        <Button href="/dashboard/transactions/new" variant="contained" color="info">Abrir formulário completo</Button>
        </Stack>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <DialogContent dividers>
          {isPending && (
            <Stack sx={{ width: "100%", pb: 3 }} spacing={2}>
              <LinearProgress />
            </Stack>
          )}
          <Stack direction="row" width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
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

              <Grid item xs={12} md={4}>
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
                    ?.filter((c: any) => c.type === "Despesa")
                    .map((category: CategoryType) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
                    <DatePicker format="DD/MM/YYYY" onChange={handleDueDateChange} value={formik.values.due_date} name="due_date" label="Vencimento" />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="cashed"
                      onChange={handleCashedChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cashed}
                      checked={formik.values.cashed}
                    />
                  }
                  label="Pago?"
                />
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" sx={{ pt: 2 }}>
            <Grid container spacing={2}>
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
              <Grid item xs={12} md={4}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="select-tags-label">Tags</InputLabel>
                  <Select
                    labelId="select-tags-label"
                    id="select-tags"
                    multiple
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" sx={{height: "54px"}} />}
                    value={selectedTagsIds}
                    onChange={(e) => handleTagSelect(e)}
                    name="tags"
                    renderValue={(selected: any) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                        {selected.map((value: any) => (
                          <Chip key={value} label={tags?.find((tag) => tag.id === value)?.name} />
                        ))}
                      </Box>
                    )}
                  >
                    {tags?.map((tag: TagType) => (
                      <MenuItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" sx={{ pt: 2 }}>
            <Grid container spacing={2}>
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
                  <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
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
        </DialogContent>
        <DialogActionButtons showDialog={showTransactionDialog} closeAction={actionShowTransactionDialog} />
      </form>
    </Dialog>
  );
};

export default TransactionFormDialog;
