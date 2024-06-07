"use client";
import { Grid, Stack, TextField, Input, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { ColorPicker } from "material-ui-color";
import { submitGroupForm } from "@/app/lib/actions/group-actions";
import DialogActionButtons from "./DialogActionButtons";
import { useGroupContext } from "@/app/lib/contexts";

const validate = yup.object({
  name: yup.string().required("Campo obrigatório"),
});

const GroupFormDialog = () => {
  const { showGroupDialog, setShowGroupDialog, editableObject } = useGroupContext();

  const formik = useFormik({
    initialValues: editableObject,
    validationSchema: validate,
    onSubmit: (values) => {
      submitGroupForm(values).then( () => {
        setShowGroupDialog(false)
      })
    },
  });

  return (
    <Dialog
      open={showGroupDialog}
      fullWidth
      maxWidth="md"
      onClose={() => setShowGroupDialog(!showGroupDialog)}
    >
      <DialogTitle>{editableObject.id ? "Editar" : "Adicionar"} grupo</DialogTitle>
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
                {/* <ColorPicker
                  onChange={formik.handleChange}
                  value={"#" + formik.values.color}
                  defaultValue={formik.values.color ?? "#000000"}
                /> */}
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActionButtons showDialog={showGroupDialog} closeAction={setShowGroupDialog} />
      </form>
    </Dialog>
  );
};

export default GroupFormDialog;
