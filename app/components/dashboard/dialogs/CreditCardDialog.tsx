'use client';
import { useCreditCardContext, usePageContext } from "@/app/lib/contexts";
import { Grid, Stack, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TopBarDialog from "@/app/components/dashboard/dialogs/TopBarDialog";
import { useFormik } from "formik";
import { ColorPicker } from "material-ui-color";
import { useEffect } from "react";
import { formSubmit } from "@/app/dashboard/credit-cards/actions";
import * as yup from "yup";

const validate = yup.object({
  id: yup.number(),
  name: yup.string().required("Campo obrigatório"),
  limit: yup.number().required("Campo obrigatório"),
  closing_day: yup.number().required("Campo obrigatório"),
  due_day: yup.number().required("Campo obrigatório"),
  current_balance: yup.number(),
  current_invoice: yup.number(),
  color: yup.string(),
});

const CreditCardDialog = () => {
  const { showModal, actionShowModal } = usePageContext();
  const { editableObject } = useCreditCardContext();

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
      <TopBarDialog title="Novo cartão de crédito" />
      <DialogContent>
        <Stack direction="row">
          <Grid container spacing={3}>
            <Grid xs={12} md={4} item>
              <input type="hidden" name="id" value={formik.values.id} />
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
            <Grid xs={12} md={2} item>
              <TextField
                helperText={formik.touched.due_day && formik.errors.due_day}
                error={formik.touched.due_day && Boolean(formik.errors.due_day)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.due_day}
                fullWidth
                name="due_day"
                label="Dt. vencimento"
              />
            </Grid>
            <Grid xs={12} md={2} item>
              <TextField
                helperText={formik.touched.closing_day && formik.errors.closing_day}
                error={formik.touched.closing_day && Boolean(formik.errors.closing_day)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.closing_day}
                fullWidth
                name="close_day"
                label="Dt. fechamento"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                helperText={formik.touched.limit && formik.errors.limit}
                error={formik.touched.limit && Boolean(formik.errors.limit)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.limit}
                fullWidth
                name="limit"
                label="Limite"
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack direction="row" sx={{ py: 2 }}>
          <Grid container spacing={3}>
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

export default CreditCardDialog;
