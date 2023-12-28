import React, { use, useCallback } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { AddNewCardProps } from "@/types/dashboard";
import * as yup from "yup";
import { useFormik } from "formik";
import { addGroup } from "@/lib/supabase-client";

const validate = yup.object({
    name: yup.string().required("Campo obrigatório"),
    });


const AddNewGroupCard = ({ toggle, action }: AddNewCardProps) => {

const formik = useFormik({
    initialValues: {
        name: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
        console.log(values);
        //addGroup("");
    },
});


  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Card sx={{ px: 4, mb: 6 }}>
        <CardHeader
          title="Novo grupo"
          action={
            <>
              <Button variant="contained" type="submit">
                Salvar
              </Button>
              <Button onClick={() => action(!toggle)}>Fechar</Button>
            </>
          }
        />
        <CardContent>
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
        </CardContent>
      </Card>
    </form>
  );
};

export default AddNewGroupCard;
