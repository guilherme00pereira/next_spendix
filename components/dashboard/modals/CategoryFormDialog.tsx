import React from "react";
import {
    Button,
    Grid,
    Stack,
    MenuItem,
    TextField, AppBar, Typography
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryForm, CategoryType } from "@/types/entities";
import { CategoryTypeDict } from "@/lib/data";
import { addCategory } from "@/lib/supabase/methods/categories";
import LinearProgress from "@mui/material/LinearProgress";
import {usePageContext} from "@/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const validate = yup.object({
    name: yup.string().required("Campo obrigatório"),
    type: yup.string().required("Campo obrigatório"),
});

const CategoryFormDialog = () => {
    const queryClient = useQueryClient();
    const {showModal, actionShowModal} = usePageContext();

    const addMutation = useMutation({
        mutationFn: (values: CategoryForm) => addCategory(values),
        onSuccess: () => {
            actionShowModal(!showModal);
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "Receita",
        },
        validationSchema: validate,
        onSubmit: (values) => {
            addMutation.mutate({name: values.name, type: values.type as CategoryType});
        },
    });

    return (
        <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Nova categoria
                    </Typography>
                    <Button variant="contained" size="large" type="submit">
                        Salvar
                    </Button>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => actionShowModal(!showModal)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                    {addMutation.isPending && (
                        <Stack sx={{width: "100%", pb: 3}} spacing={2}>
                            <LinearProgress/>
                        </Stack>
                    )}
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
            </DialogContent>
        </form>
        </Dialog>
    );
};

export default CategoryFormDialog;