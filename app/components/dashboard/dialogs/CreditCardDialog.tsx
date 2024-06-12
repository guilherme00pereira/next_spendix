"use client";
import { useCreditCardContext, usePageContext } from "@/app/lib/contexts";
import { DialogTitle, Grid, Stack, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import { ColorPicker } from "material-ui-color";
import { submitCardForm } from "@/app/lib/actions/credit-card-actions";
import * as yup from "yup";
import DialogActionButtons from "./DialogActionButtons";

const validate = yup.object({
  id: yup.number(),
  name: yup.string().required("Campo obrigatório"),
  limit: yup.number().required("Campo obrigatório"),
  closing_day: yup.number().required("Campo obrigatório"),
  due_day: yup.number().required("Campo obrigatório"),
  color: yup.string(),
  final_numbers: yup.string().nullable(),
  brand: yup.string().nullable(),
});

const CreditCardDialog = () => {
  const { showModal, actionShowModal } = usePageContext();
  const { editableObject } = useCreditCardContext();

  const formik = useFormik({
    initialValues: editableObject,
    validationSchema: validate,
    onSubmit: (values) => {
      actionShowModal(!showModal);
      submitCardForm(values);
    },
  });

  return (
    <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
      <DialogTitle>{editableObject.id ? "Editar" : "Adicionar"} cartão de crédito</DialogTitle>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                <TextField
                  helperText={formik.touched.final_numbers && formik.errors.final_numbers}
                  error={formik.touched.final_numbers && Boolean(formik.errors.final_numbers)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.final_numbers}
                  fullWidth
                  name="final_numbers"
                  label="Last 4 digits"
                />
              </Grid>
              <Grid xs={12} md={4} item>
                <ColorPicker onChange={formik.handleChange} value={"#" + formik.values.color} defaultValue={"#000"} />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActionButtons showDialog={showModal} closeAction={actionShowModal} />
      </form>
    </Dialog>
  );
};

export default CreditCardDialog;
