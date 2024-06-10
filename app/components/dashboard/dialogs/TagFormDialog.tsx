"use client";
import React from "react";
import { DialogTitle, Grid, Stack, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { usePageContext, useTagContext } from "@/app/lib/contexts";
import TopBarDialog from "@/app/components/dashboard/dialogs/TopBarDialog";
import { submitTagForm } from "@/app/lib/actions/tag-actions";

const validate = yup.object({
  id: yup.number(),
  name: yup.string().required("Campo obrigatório"),
});

const TagFormDialog = () => {
  const { showModal, actionShowModal } = usePageContext();
  const { editableObject } = useTagContext();

  const formik = useFormik({
    initialValues: editableObject,
    validationSchema: validate,
    onSubmit: (values) => {
      submitTagForm(values).then(() => {
        actionShowModal(false);
      });
    },
  });

  return (
    <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
      <DialogTitle>{editableObject.id ? "Editar" : "Adicionar"} tag</DialogTitle>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarDialog title="Nova tag" />
        <DialogContent>
          <Stack direction="row">
            <Grid container spacing={3}>
              <Grid xs={12} md={6} item>
                <TextField
                  helperText={formik.touched.name && formik.errors.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  fullWidth
                  name="name"
                  label="Nome"
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TagFormDialog;
