import React from "react";
import { Grid, Stack, MenuItem, TextField, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryForm, CategoryType } from "@/types/entities";
import { CategoryTypeDict } from "@/lib/data";
import { addCategory, editCategory } from "@/lib/supabase/methods/categories";
import LinearProgress from "@mui/material/LinearProgress";
import { usePageContext } from "@/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalTopBar from "@/components/dashboard/modals/ModalTopBar";

const validate = yup.object({
  name: yup.string().required("Campo obrigatório"),
  type: yup.string().required("Campo obrigatório"),
});

const CategoryFormDialog = ({ category }: { category: CategoryForm }) => {
  const queryClient = useQueryClient();
  const { showModal, actionShowModal } = usePageContext();

  const addMutation = useMutation({
    mutationFn: (values: CategoryForm) => addCategory(values),
    onSuccess: () => {
      actionShowModal(!showModal);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: (values: CategoryForm) => editCategory(values),
    onSuccess: () => {
      actionShowModal(!showModal);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const formik = useFormik({
    initialValues: category,
    validationSchema: validate,
    onSubmit: (values) => {
      if (values.id) editMutation.mutate({ id: values.id, name: values.name, type: values.type as CategoryType });
      else addMutation.mutate({ name: values.name, type: values.type as CategoryType });
    },
  });

  return (
    <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <ModalTopBar title="Nova categoria" />
        <DialogContent>
          {addMutation.isPending && (
            <Stack sx={{ width: "100%", pb: 3 }} spacing={2}>
              <LinearProgress />
            </Stack>
          )}
          <Stack direction="row">
            <Grid container spacing={3}>
              <Grid xs={12} md={6} item>
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
              <Grid xs={12} md={6} item>
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
                  {CategoryTypeDict.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;
