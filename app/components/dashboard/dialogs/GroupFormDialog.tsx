"use client";
import { Grid, Stack, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { ColorPicker } from "material-ui-color";
import { formSubmit } from "@/app/dashboard/groups/actions";
import { useSpeedDialStore } from "@/app/lib/store";
import TopBarSpeedDialog from "./TopBarSpeedDialog";

const validate = yup.object({
  id: yup.number(),
  name: yup.string().required("Campo obrigatório"),
  color: yup.string(),
});

const GroupFormDialog = () => {
  const { showGroupDialog, actionShowGroupDialog, group } = useSpeedDialStore();

  const formik = useFormik({
    initialValues: group,
    validationSchema: validate,
    onSubmit: (values) => {
      formSubmit(values);
    },
  });

  return (
    <Dialog
      open={showGroupDialog}
      fullWidth
      maxWidth="md"
      onClose={() => actionShowGroupDialog(!showGroupDialog)}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TopBarSpeedDialog title="Novo grupo" showDialog={showGroupDialog} closeAction={actionShowGroupDialog} />
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
      </form>
    </Dialog>
  );
};

export default GroupFormDialog;
