'use client'
import React, {useEffect} from "react";
import {
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as yup from "yup";
import {useFormik} from "formik";
import LinearProgress from "@mui/material/LinearProgress";
import {usePageContext, useTagContext} from "@/app/lib/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TopBarDialog from "@/app/components/dashboard/dialogs/TopBarDialog";
import { addTag, editTag } from "@/app/lib/supabase/methods/tags";
import {TagType} from "@/types/entities";

const validate = yup.object({
    id: yup.number(),
    name: yup.string().required("Campo obrigatório"),
});


const TagFormDialog = () => {
    const queryClient = useQueryClient();
    const {showModal, actionShowModal} = usePageContext();
    const { editableObject } = useTagContext();

    useEffect(() => {
        formik.setValues(editableObject);
    }, [editableObject]);

    const addMutation = useMutation({
        mutationFn: (value: string) => addTag(value),
        onSuccess: () => {
            actionShowModal(!showModal);
            queryClient.invalidateQueries({queryKey: ['tags']});
        },
    });

    const editMutation = useMutation({
        mutationFn: (values: TagType) => editTag(values),
        onSuccess: () => {
            actionShowModal(!showModal);
            queryClient.invalidateQueries({queryKey: ['tags']});
        },
    });


    const formik = useFormik({
        initialValues: editableObject,
        validationSchema: validate,
        onSubmit: (values) => {
            if (values.id !== 0) {
                editMutation.mutate(values);
            } else {
                addMutation.mutate(values.name);
            }
        },
    });


    return (
        <Dialog open={showModal} fullWidth maxWidth="md" onClose={() => actionShowModal(!showModal)}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <TopBarDialog title="Nova tag" />
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

export default TagFormDialog;
