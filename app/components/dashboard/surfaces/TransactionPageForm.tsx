"use client";
import React, { useState } from "react";
import {
  Stack,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import { CategoryType, TagType, TransactionFormData } from "@/types/entities";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";
import { serializeToServeActions } from "@/app/lib/functions";
import { submitTransactionForm } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";

interface ITransactionPageFormProps {
  transaction: TransactionFormData;
  categories: CategoryType[];
  tags: TagType[];
  paymentMethods: any[];
}

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
  draft: yup.boolean(),
});

const TransactionPageForm = ({ transaction, categories, tags, paymentMethods }: ITransactionPageFormProps) => {
  const [isCashed, setIsCashed] = useState<boolean>(true);
  const [hasInstallments, setHasInstallments] = useState<boolean>(false);
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

  const handleInstallmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("in_installments", e.target.checked);
    setHasInstallments(e.target.checked);
  };

  const handleTagSelect = (e: SelectChangeEvent<number[]>) => {
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
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" width="100%" spacing={4}>


        <PaperContainer sx={{ p: 2 }} width="70%">
          <PaperHeader title="Dados da transação" />
          <Stack direction="row">
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
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" sx={{ height: "54px" }} />}
                    value={selectedTagsIds}
                    onChange={(e) => handleTagSelect(e)}
                    name="tags"
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                        {selected.map((value) => (
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
        </PaperContainer>

        <Stack direction="column" spacing={2} width="30%">

        <PaperContainer sx={{ p: 2 }}>
          <PaperHeader title="Prevista?" />
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="draft"
                      value={formik.values.draft}
                      onChange={formik.handleChange}
                      checked={formik.values.draft}
                    />
                  }
                  label="Marcar como despesa prevista"
                />
              </Grid>
            </Grid>
          </Stack>
        </PaperContainer>

          <PaperContainer sx={{ p: 2 }}>
            <PaperHeader title="Parcelamento" />
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="in_installments"
                        value={formik.values.in_installments}
                        onChange={handleInstallmentsChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.in_installments}
                      />
                    }
                    label="É Parcelado?"
                  />
                </Grid>
                <Grid item xs={12}>
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
              </Grid>
            </Stack>
          </PaperContainer>
          </Stack>

      </Stack>
    </form>
  );
};

export default TransactionPageForm;
