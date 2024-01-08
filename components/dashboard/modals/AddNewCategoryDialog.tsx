import React from "react";
import {
    Button,
    Grid,
    Stack,
    MenuItem,
    TextField, AppBar, Typography, DialogProps,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { AddNewCardProps } from "@/types/interfaces";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryType } from "@/types/entities";
import { CategoryTypeDict } from "@/lib/data";
import { addCategory } from "@/lib/supabase/supabase-client";
import LinearProgress from "@mui/material/LinearProgress";

const validate = yup.object({
    name: yup.string().required("Campo obrigatório"),
    type: yup.string().required("Campo obrigatório"),
});

const AddNewCategoryDialog = ({ toggle, action }: AddNewCardProps) => {
    const [saving, setSaving] = React.useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "Receita",
        },
        validationSchema: validate,
        onSubmit: (values) => {
            setSaving(true)
            addCategory(values.name, values.type as CategoryType).then(() => {
                setSaving(false);
                action(!toggle);
            }).catch((error) => {
                console.error(error);
                setSaving(false);
            });
        },
    });


    return (
        <Dialog open={toggle} fullWidth maxWidth="md" onClose={() => action(!toggle)}>
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
                        onClick={() => action(!toggle)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                    {saving && (
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

export default AddNewCategoryDialog;