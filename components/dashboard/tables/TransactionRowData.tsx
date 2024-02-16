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
import {usePageContext, useSpeedDialStore} from "@/lib/hooks";
import { RemovableEntity, TransactionRowDataProps } from "@/types/interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/dashboard/modals/ConfirmDeleteDialog";
import dayjs from "dayjs";
import {TransactionType, TransactionUpdateStatusProps} from "@/types/entities";


const TransactionRowData = ({ day, transactions, open }: TransactionRowDataProps) => {
  const queryClient = useQueryClient();
  const { setTransaction, actionShowTransactionDialog } = useSpeedDialStore();
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

  const handleConfirmDelete = (id: number, amount: number, category?: string) => {
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
      category_id: t.categories?.id ?? 0,
      payment_date: t.payments?.date ? dayjs(t.payments.date) : null,
      payed_amount: t.payments?.amount ?? null,
      payment_method_id: t.payments?.id ?? 0,
      times: 2,
      recurring: false,
    });
    actionShowTransactionDialog(true);
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
                <TableRow key={transaction.id} sx={styles.rowline}>
                  <TableCell/>
                  <TableCell component="th" scope="row" align="center">
                    <Stack direction="row" justifyContent="space-around">
                      <Typography variant="body2" fontWeight="bold">
                        {amountFormatter(transaction.amount)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {transaction.categories?.name ?? ""}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography color={transaction.categories?.type === "Receita" ? "success.main" : "secondary.main"}
                                variant="body2" fontWeight="bold">
                      {transaction.categories?.type}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography variant="body2" color="text.secondary">
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Typography variant="body2" color="text.secondary">
                      {transaction.payments?.method ?? "Não informado"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="text" color="info" onClick={() => handleEdit(transaction)}>
                      <EditRoundedIcon fontSize="small" />
                    </Button>
                    <Button size="small" variant="text" color="error" onClick={() => handleConfirmDelete(transaction.id, transaction.amount, transaction.categories?.name)}>
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
  rowline: {
    backgroundColor: (theme: any) => theme.palette.neutral[25],
    "&:last-child td, &:last-child th": { border: 0 }
  },
  headrow: {
    '& > *': {
      backgroundColor: "#FFF !important",
    }
  },
}