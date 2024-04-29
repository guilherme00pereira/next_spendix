'use client'
import React, { useEffect } from "react";
import { useBankAccountContext, usePageContext } from "@/app/lib/contexts";
import { Dialog, DialogContent, Grid, Input, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import TopBarDialog from "./TopBarDialog";
import { ColorPicker } from "material-ui-color";
import { formSubmit } from "@/app/dashboard/bank-accounts/actions";

const validate = yup.object({
  id: yup.number(),
  bank: yup.string().required("Campo obrigatório"),
  balance: yup.number().required("Campo obrigatório"),
  color: yup.string(),
});

const BankAccountDialog = () => {
  const { showModal, actionShowModal } = usePageContext();
  const { editableObject } = useBankAccountContext();

  useEffect(() => {
    formik.setValues(editableObject);
  }, [editableObject]);


  const formik = useFormik({
    initialValues: editableObject,
    validationSchema: validate,
    onSubmit: (values) => {
      actionShowModal(!showModal);
      formSubmit(values)
    },
  });

  return (
    <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarDialog title="Nova conta" />
        <DialogContent>
          <Stack direction="row">
            <Grid container spacing={3}>
              <Grid xs={12} md={4} item>
                <Input type="hidden" name="id" value={formik.values.id} />
                <TextField
                  helperText={formik.touched.bank && formik.errors.bank}
                  error={formik.touched.bank && Boolean(formik.errors.bank)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bank}
                  fullWidth
                  name="bank"
                  label="Banco"
                />
              </Grid>
              <Grid xs={12} md={4} item>
                <TextField
                  helperText={formik.touched.balance && formik.errors.balance}
                  error={formik.touched.balance && Boolean(formik.errors.balance)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.balance}
                  fullWidth
                  name="balance"
                  label="Saldo"
                />
              </Grid>
              <Grid xs={12} md={4} item>
                <ColorPicker onChange={formik.handleChange} value={"#" + formik.values.color} defaultValue={formik.values.color} />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BankAccountDialog;
