import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Stack,
    TextField, Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import * as yup from "yup";
import {useFormik} from "formik";
import {TransactionForm} from "@/types/entities";
import {addTransaction} from "@/lib/supabase/methods/transactions";
import {getCategories} from "@/lib/supabase/methods/categories";
import dayjs from "dayjs";
import {usePageContext} from "@/lib/hooks";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";


const validate = yup.object({
    amount: yup
        .number()
        .min(1, "Insira apenas valores maiores que 1")
        .typeError("não é um número válido")
        .required("Campo obrigatório"),
    category: yup.string().required("Campo obrigatório"),
    cashed: yup.boolean(),
    description: yup.string(),
    date: yup.date().required("Campo obrigatório"),
    times: yup.number().min(2, "Insira apenas valores maiores que 2"),
    recurring: yup.boolean(),
});

const TransactionFormDialog = () => {
    const queryClient = useQueryClient();
    const {showModal, actionShowModal} = usePageContext();
    const [isRecurring, setIsRecurring] = useState<boolean>(false);

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
      });

    const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRecurring(e.target.checked);
        formik.setFieldValue('recurring', e.target.checked);
    }

    const addMutation = useMutation({
        mutationFn: (values: TransactionForm) => addTransaction(values),
        onSuccess: () => {
            actionShowModal(!showModal);
            queryClient.invalidateQueries({queryKey: ['transactions']});
        },
    });

    const formik = useFormik({
        initialValues: {
            amount: "",
            category: "3",
            cashed: true,
            description: "",
            date: dayjs(Date.now()),
            times: 2,
            recurring: false,
        },
        validationSchema: validate,
        onSubmit: (values) => {
            addMutation.mutate({
                amount: parseFloat(values['amount']),
                date: values['date'],
                description: values['description'],
                cashed: values['cashed'],
                categories: [parseInt(values['category'])],
                times: values['times'],
                recurring: values['recurring'],
            })
        },
        });   
    

    return (
        <Dialog open={showModal} fullScreen onClose={() => actionShowModal(!showModal)}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Novo lançamento
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
                                    SelectProps={{native: true}}
                                    name="category"
                                    label="Categoria"
                                >
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            onChange={(value => formik.setFieldValue('date', value))}
                                            value={formik.values.date}
                                            name="date"
                                            label="Vencimento"
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Stack>

                    <Stack direction="row" sx={{py: 2}}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="cashed"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.cashed}
                                            defaultChecked={true}
                                        />
                                    }
                                    label="Pago?"
                                />
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="recurring"
                                            value={formik.values.recurring}
                                            onChange={handleRecurringChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    }
                                    label="Recorrente?"
                                />
                            </Grid>

                            {isRecurring && (
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        helperText={formik.touched.times && formik.errors.times}
                                        error={formik.touched.times && Boolean(formik.errors.times)}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.times}
                                        fullWidth
                                        name="times"
                                        label="Nº de parcelas"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Stack>

                    <Stack direction="row">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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


                        </Grid>
                    </Stack>
            </DialogContent>
        </form>
        </Dialog>
    );
};

export default TransactionFormDialog;
