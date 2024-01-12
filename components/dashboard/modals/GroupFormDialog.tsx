import React, { useState } from "react";
import {
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as yup from "yup";
import {useFormik} from "formik";
import {addGroup} from "@/lib/supabase/methods/groups";
import LinearProgress from "@mui/material/LinearProgress";
import {usePageContext} from "@/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalTopBar from "@/components/dashboard/modals/ModalTopBar";

const validate = yup.object({
    name: yup.string().required("Campo obrigatório"),
});


const GroupFormDialog = () => {
    const queryClient = useQueryClient();
    const {showModal, actionShowModal} = usePageContext();

    const addMutation = useMutation({
        mutationFn: (value: string) => addGroup(value),
        onSuccess: () => {
            actionShowModal(!showModal);
            queryClient.invalidateQueries({queryKey: ['groups']});
        },
    });

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: validate,
        onSubmit: (values) => {
            addMutation.mutate(values.name);
        },
    });


    return (
        <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <ModalTopBar title="Novo grupo" />
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
                        </Grid>
                    </Stack>
            </DialogContent>
        </form>
        </Dialog>
    );
};

export default GroupFormDialog;
