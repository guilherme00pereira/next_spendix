import React from 'react';
import {Button, Card, CardContent, CardHeader, Grid, Stack, TextField} from "@mui/material";

interface AddNewCardProps {
    toggle: boolean;
    action: (showAdd: boolean) => void;
}

const AddNewTransactionCard = ({toggle, action}: AddNewCardProps) => {

    const saveNewTransaction = () => {
        console.log('save transaction');
    }

    return (
        <Card sx={{p: 2}}>
            <CardHeader title="Novo lançamento" action={
                <>
                    <Button variant="contained" onClick={saveNewTransaction}>Salvar</Button>
                    <Button onClick={() => action(!toggle)}>Fechar</Button>
                </>
            }
            />
            <CardContent>
                <Stack direction="row">
                    <Grid container spacing={3}>
                        <Grid xs={12} md={4}>
                            <TextField name="tsx_value" label="Valor" required/>
                        </Grid>
                        <Grid xs={12} md={4}>
                            Recorrente?
                        </Grid>
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default AddNewTransactionCard;