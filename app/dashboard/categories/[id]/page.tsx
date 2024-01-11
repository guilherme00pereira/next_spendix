'use client';
import {useState} from 'react';
import { Stack, Container, Typography } from "@mui/material";
import { SinglePageParams } from '@/types/interfaces';
import ListTransactionsByCategoryTable from '@/components/dashboard/tables/ListTransactionsByCategoryTable';


const CategoryPage = ({params}: SinglePageParams) => {
    const [name, setName] = useState<string>("")
    const [type, setType] = useState<string>("")

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5">
                Lançamentos no mês para {name} ({type})
            </Typography>
          </Stack>
            <ListTransactionsByCategoryTable id={params.id} handleName={setName} handleType={setType} />
        </Stack>
      </Container>
    );
};

export default CategoryPage;