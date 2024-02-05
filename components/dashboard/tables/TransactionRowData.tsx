import { useState } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Collapse from "@mui/material/Collapse";
import { Button, Stack, Typography } from "@mui/material";
import { amountFormatter } from "@/lib/functions";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { removeTransaction, updateTransactionCashedStatus } from "@/lib/supabase/methods/transactions";
import {usePageContext, useTransactionContext} from "@/lib/hooks";
import { RemovableEntity, TransactionRowDataProps } from "@/types/interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/dashboard/modals/ConfirmDeleteDialog";
import dayjs from "dayjs";
import {TransactionType, TransactionUpdateStatusProps} from "@/types/entities";


const TransactionRowData = ({ day, transactions, open }: TransactionRowDataProps) => {
  const queryClient = useQueryClient();
  const { actionShowModal } = usePageContext();
  const { setTransaction } = useTransactionContext();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableTransaction, setRemovableTransaction] = useState<RemovableEntity>({ id: 0, name: "", type: "transação" });

  const cashedMutation = useMutation({
    mutationFn: (value: TransactionUpdateStatusProps) => updateTransactionCashedStatus(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => removeTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleUpdateStatus = (id: number) => {

  }

  const handleConfirmDelete = (id: number, amount: number, category: string) => {
    setRemovableTransaction({ ...removableTransaction, id, name: category + " no valor de R$ " + amountFormatter(amount) });
    setOpenConfirm(true);
  };

  const processDelete = () => {
    if (typeof removableTransaction.id !== "undefined") {
      deleteMutation.mutate(removableTransaction?.id);
      setOpenConfirm(false);
    }
  };

  const handleEdit = (t: TransactionType) => {
    setTransaction({
      id: t.id,
      amount: t.amount,
      due_date: dayjs(t.due_date),
      description: t.description,
      cashed: t.cashed,
      category_id: t.categories.id,
      payment_date: t.payment_date ? dayjs(t.payment_date) : null,
      payed_amount: t.payed_amount ?? null,
      payment_option_id: t.payment_options.id,
      times: 2,
      recurring: false,
    });
    actionShowModal(true);
  }

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow sx={styles.headrow}>
                <TableCell />
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Categoria</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Meio Pagto</TableCell>
                <TableCell align="center">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell/>
                  <TableCell component="th" scope="row" align="center">
                    <Stack direction="row" justifyContent="space-around">
                      <Typography variant="body2" fontWeight="bold">
                        {amountFormatter(transaction.payed_amount ?? transaction.amount)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {transaction.categories.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography color={transaction.categories.type === "Receita" ? "success.main" : "secondary.main"}
                                variant="body2" fontWeight="bold">
                      {transaction.categories.type}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography variant="body2" color="text.secondary">
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography variant="body2" color="text.secondary">
                      {transaction.payment_options.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/*{transaction.cashed || (*/}
                    {/*  <Tooltip title="Marcar como pago" arrow>*/}
                    {/*    <Button size="small" variant="text" color="success" onClick={() => handleUpdateStatus(transaction.id)}>*/}
                    {/*      <CheckRoundedIcon fontSize="small" />*/}
                    {/*    </Button>*/}
                    {/*  </Tooltip>*/}
                    {/*)}*/}
                    <Button size="small" variant="text" color="info" onClick={() => handleEdit(transaction)}>
                      <EditRoundedIcon fontSize="small" />
                    </Button>
                    <Button size="small" variant="text" color="error" onClick={() => handleConfirmDelete(transaction.id, transaction.amount, transaction.categories.name)}>
                      <DeleteRoundedIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ConfirmDeleteDialog entity={removableTransaction} open={openConfirm} handleClose={setOpenConfirm} handleDelete={processDelete} />
    </Collapse>
  );
};

export default TransactionRowData;

const styles = {
  headrow: {
    '& > *': {
      backgroundColor: "#FFF !important",
    }
  },
}