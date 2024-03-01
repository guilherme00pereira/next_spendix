import { useEffect, useState } from "react";
import { Grid, Stack, MenuItem, TextField, Input } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryFormData, CategoryType } from "@/types/entities";
import { CategoryTypeDict } from "@/lib/data";
import { addCategory, editCategory, getCategories } from "@/lib/supabase/methods/categories";
import LinearProgress from "@mui/material/LinearProgress";
import { useSpeedDialStore } from "@/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopBarDialog from "@/components/dashboard/dialogs/TopBarDialog";
import { ISelectOption } from "@/types/interfaces";

const validate = yup.object({
  name: yup.string().required("Campo obrigatório"),
  parent: yup.string(),
  type: yup.string().required("Campo obrigatório"),
});

const CategoryFormDialog = () => {
  const queryClient = useQueryClient();
  const { showCategoryDialog, actionShowCategoryDialog, category } = useSpeedDialStore();
  const [parents, setParents] = useState<ISelectOption[]>([]);

  const addMutation = useMutation({
    mutationFn: (values: CategoryFormData) => addCategory(values),
    onSuccess: () => {
      actionShowCategoryDialog(!showCategoryDialog);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: (values: CategoryFormData) => editCategory(values),
    onSuccess: () => {
      actionShowCategoryDialog(!showCategoryDialog);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  useEffect(() => {
    console.log(category);
    let options: ISelectOption[] = [];
    queryClient
      .ensureQueryData({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
      })
      .then((data) => {
        const filtered = data?.filter((category: any) => {
          if (category.parent === null) return category;
        });
        filtered?.map((category: any) => {
          options.push({ value: category.id, label: category.name });
        });
        setParents([...options]);
      });
  }, []);

  const formik = useFormik({
    initialValues: category,
    validationSchema: validate,
    onSubmit: (values) => {
      if (values.id) {
        editMutation.mutate({ 
          id: values.id, 
          name: values.name, 
          parent: values.parent === 0 ? null : values.parent, 
          type: values.type, 
          color: null, 
          icon: null 
        });
      } else {
        addMutation.mutate({ 
          name: values.name, 
          parent: values.parent === 0 ? null : values.parent, 
          type: values.type, 
          color: null, 
          icon: null 
        });
      }
    },
  });

  return (
    <Dialog open={showCategoryDialog} fullWidth maxWidth="md" onClose={() => actionShowCategoryDialog(!showCategoryDialog)}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarDialog title="Nova categoria" />
        <DialogContent>
          {addMutation.isPending && (
            <Stack sx={{ width: "100%", pb: 3 }} spacing={2}>
              <LinearProgress />
            </Stack>
          )}
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
                  helperText={formik.touched.parent && formik.errors.parent}
                  error={formik.touched.parent && Boolean(formik.errors.parent)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parent}
                  fullWidth
                  name="parent"
                  label="Categoria pai"
                  select
                >
                  <MenuItem value={0}>Nenhuma</MenuItem>
                  {parents &&
                    parents.map((option: ISelectOption) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
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
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;
