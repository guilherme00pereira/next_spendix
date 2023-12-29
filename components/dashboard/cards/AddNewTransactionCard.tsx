"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { AddNewCardProps } from "@/types/dashboard";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryDAO } from "@/types/entities";
import { getCategories } from "@/lib/supabase-client";

const validate = yup.object({
  amount: yup
    .number()
    .min(1, "Insira apenas valores maiores que 1")
    .typeError("não é um número válido")
    .required("Campo obrigatório"),
  category: yup.string().required("Campo obrigatório"),
  draft: yup.boolean(),
  description: yup.string(),
  date: yup.date().required("Campo obrigatório"),
});

const AddNewTransactionCard = ({ toggle, action }: AddNewCardProps) => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryDAO[]>([]);

  useEffect(() => {
    try {
      getCategories().then((data) => setCategories(data as CategoryDAO[]));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "3",
      draft: false,
      description: "",
      date: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Card sx={{ px: 4, mb: 6 }}>
        <CardHeader
          title="Novo lançamento"
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  helperText={formik.touched.amount && formik.errors.amount}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  fullWidth
                  name="amount"
                  label="Valor"
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  helperText={formik.touched.category && formik.errors.category}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  name="category"
                  label="Categoria"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  helperText={formik.touched.date && formik.errors.date}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                  fullWidth
                  name="date"
                  label="Data"
                />
              </Grid>
            </Grid>
          </Stack>

          <Stack direction="row" sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  fullWidth
                  name="description"
                  label="Descrição"
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="draft"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.draft}
                    />
                  }
                  label="Rascunho?"
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="recurring"
                      value={isRecurring}
                      onChange={() => setIsRecurring(!isRecurring)}
                    />
                  }
                  label="Recorrente?"
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddNewTransactionCard;
