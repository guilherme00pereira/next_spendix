import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Stack,
    MenuItem,
    TextField,
} from "@mui/material";
import { AddNewCardProps } from "@/types/dashboard";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryTypeDict, CategoryType } from "@/types/entities";
import { addCategory } from "@/lib/supabase-client";

const validate = yup.object({
    name: yup.string().required("Campo obrigatório"),
    type: yup.string().required("Campo obrigatório"),
});

const AddNewCategoryCard = ({ toggle, action }: AddNewCardProps) => {

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "Receita",
        },
        validationSchema: validate,
        onSubmit: (values) => {
            addCategory(values.name, values.type as CategoryType).then(() => action(!toggle));
        },
    });


    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Card sx={{px: 4, mb: 6}}>
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
                </CardContent>
            </Card>
        </form>
    );
};

export default AddNewCategoryCard;