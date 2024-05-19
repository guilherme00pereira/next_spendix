"use client";
import { Grid, Stack, MenuItem, TextField, Input, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryTypeDict } from "@/app/lib/data";
import { useSpeedDialStore } from "@/app/lib/store";
import { ISelectOption } from "@/types/interfaces";
import TopBarSpeedDialog from "./TopBarSpeedDialog";
import { submitCategoryForm } from "@/app/lib/actions/categories-actions";
import DialogActionButtons from "./DialogActionButtons";

const validate = yup.object({
  name: yup.string().required("Campo obrigatório"),
  parent: yup.string(),
  type: yup.string().required("Campo obrigatório"),
});

const CategoryFormDialog = () => {
  const { showCategoryDialog, actionShowCategoryDialog, category } = useSpeedDialStore();

  const formik = useFormik({
    initialValues: category,
    validationSchema: validate,
    onSubmit: (values) => {
      submitCategoryForm(values).then(() => {
        actionShowCategoryDialog(false);
      });
    },
  });

  return (
    <Dialog
      open={showCategoryDialog}
      fullWidth
      maxWidth="md"
      onClose={() => actionShowCategoryDialog(!showCategoryDialog)}
    >
      <DialogTitle>{category.id ? "Editar" : "Adicionar"} categoria</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <Stack direction="row">
            <Grid container spacing={3}>
              <Grid xs={12} md={4} item>
                <Input type="hidden" name="id" value={formik.values.id} />
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
              <Grid xs={12} md={4} item>
                <TextField
                  helperText={formik.touched.type && formik.errors.type}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  fullWidth
                  name="type"
                  label="Tipo"
                  select
                >
                  {CategoryTypeDict.map((option: ISelectOption) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActionButtons showDialog={showCategoryDialog} closeAction={actionShowCategoryDialog} />
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;
