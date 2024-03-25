import React, { useEffect } from "react";
import { useBankAccountContext, usePageContext } from "@/lib/hooks";
import { Dialog, DialogContent, Grid, Input, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBankAccount, editBankAccount } from "@/lib/supabase/methods/bank-accounts";
import TopBarDialog from "./TopBarDialog";
import { Stack } from "@mui/system";
import { BankAccountType } from "@/types/entities";
import { ColorPicker } from "material-ui-color";

const validate = yup.object({
  id: yup.number(),
  bank: yup.string().required("Campo obrigatório"),
  balance: yup.number().required("Campo obrigatório"),
  color: yup.string(),
});

const BankAccountDialog = () => {
  const queryClient = useQueryClient();
  const { showModal, actionShowModal } = usePageContext();
  const { editableAccount } = useBankAccountContext();

  useEffect(() => {
    formik.setValues(editableAccount);
  }, [editableAccount]);

  const addMutation = useMutation({
    mutationFn: (values: BankAccountType) => addBankAccount(values),
    onSuccess: () => {
      actionShowModal(!showModal);
      queryClient.invalidateQueries({ queryKey: ["bank_accounts"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: (values: BankAccountType) => editBankAccount(values),
    onSuccess: () => {
      actionShowModal(!showModal);
      queryClient.invalidateQueries({ queryKey: ["bank_accounts"] });
    },
  });

  const formik = useFormik({
    initialValues: editableAccount,
    validationSchema: validate,
    onSubmit: (values) => {
      if (values.id) {
        editMutation.mutate(values);
        return;
      } else {
        addMutation.mutate(values);
      }
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
                  type="number"
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
