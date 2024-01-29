'use client'
import {useMemo, useState} from "react";
import {
    Stack,
    Container,
    Typography,
    Button,
    SvgIcon,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TransactionFormDialog from "@/components/dashboard/modals/TransactionFormDialog";
import ListTransactionsTable from "@/components/dashboard/tables/ListTransactionsTable";
import Box from "@mui/material/Box";
import SelectMonthYear from "@/components/dashboard/SelectMonthYear";
import {usePageContext} from "@/lib/hooks";
import { TransactionForm } from "@/types/entities";
import { TransactionDefaultData } from "@/lib/data";
import { TransactionContext } from "@/lib/hooks";

const TransactionsPage = () => {
    const {showModal, actionShowModal} = usePageContext();
    const monthAndYear = useMemo(() => {
        const date = new Date();
        const month = date.toLocaleString("default", {month: "long"});
        const year = date.getFullYear();
        return `${month} de ${year}`;
    }, []);
    const [formTransactionObject, setFormTransactionObject] = useState<TransactionForm>(TransactionDefaultData);

    const handleAddNew = () => {
        actionShowModal(true);
        setFormTransactionObject(TransactionDefaultData);
    }

    return (
      <TransactionContext.Provider value={{
          balanceTotal: [],
          transaction: formTransactionObject,
          setTransaction: setFormTransactionObject
      }}>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box>
                <Stack
                    direction={{xs: "column", sm: "row"}}
                    justifyContent={{xs: "center", sm: "space-between"}}
                    alignItems="center"
                    sx={{mb: 2}}
                >
                    <Typography variant="h5" textAlign="center">Lançamentos {monthAndYear}</Typography>
                    <SelectMonthYear/>
                    <Button
                        startIcon={
                            <SvgIcon fontSize="small">
                                <AddRoundedIcon/>
                            </SvgIcon>
                        }
                        variant="contained"
                        onClick={handleAddNew}
                    >
                        Add
                    </Button>
                </Stack>
                {showModal && (
                    <TransactionFormDialog />
                )}
                <ListTransactionsTable/>
            </Box>
        </Container>
      </TransactionContext.Provider>
    );
};

export default TransactionsPage;
