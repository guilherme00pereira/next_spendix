import { usePageContext } from '@/lib/hooks';
import {
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TopBarDialog from "@/components/dashboard/dialogs/TopBarDialog";
import * as yup from "yup";
import {useFormik} from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCreditCard } from '@/lib/supabase/methods/credit-cards';

const validate = yup.object({
    name: yup.string().required("Campo obrigatório"),
});

const CreditCardDialog = () => {
    const queryClient = useQueryClient();
    const {showModal, actionShowModal} = usePageContext();

    const addMutation = useMutation({
        mutationFn: (value: string) => addCreditCard(value),
        onSuccess: () => {
            actionShowModal(!showModal);
            queryClient.invalidateQueries({queryKey: ['credit_cards']});
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
            <TopBarDialog title="Novo grupo" />
            <DialogContent>
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
        </Dialog>
    );
};

export default CreditCardDialog;