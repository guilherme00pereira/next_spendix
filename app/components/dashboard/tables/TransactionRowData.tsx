import {useState} from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Collapse from "@mui/material/Collapse";
import { Button, Stack, Typography } from "@mui/material";
import { amountFormatter } from "@/app/lib/functions";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { removeTransaction } from "@/app/lib/supabase/methods/transactions";
import {useSpeedDialStore} from "@/app/lib/store";
import { IDeleteTransactionData, IRemovableEntity, ITransactionRowDataProps } from "@/types/interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import dayjs from "dayjs";
import {TransactionType} from "@/types/entities";


const TransactionRowData = ({ transactions, open }: ITransactionRowDataProps) => {
  const queryClient = useQueryClient();
  const { setTransaction, actionShowTransactionDialog } = useSpeedDialStore();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableTransaction, setRemovableTransaction] = useState<IRemovableEntity>({ id: 0, name: "", type: "transação"});

  
  const deleteMutation = useMutation({
    mutationFn: ({id, payment_id}: IDeleteTransactionData) => removeTransaction({id, payment_id}),
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
      deleteMutation.mutate({id: removableTransaction?.id, payment_id: null});
      setOpenConfirm(false);
    }
  };

  const handleEdit = (t: TransactionType) => {
    setTransaction({
      id: t.id,
      amount: t.amount,
      due_date: dayjs(t.due_date),
      description: t.description,
      cashed: !!t.payments?.id,
      category_id: t.categories?.id ?? 0,
      payment_date: t.payments?.date ? dayjs(t.payments.date) : null,
      payed_amount: t.payments?.amount ?? null,
      payment_method_id: 1,
      payment_id: t.payments?.id ?? 0,
      in_installments: !!t.installments,
      installments: 2,
      draft: t.draft,
      tags_ids: [],
    });
    actionShowTransactionDialog(true);
  }

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small">
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
                  <Link href={`/dashboard/categories/${transaction.categories?.slug}`}>
                    {transaction.categories?.name ?? ""}
                  </Link>
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
    backgroundColor: (theme: any) => theme.palette.info.lightest,
    "&:last-child td, &:last-child th": { border: 0 }
  },
  headrow: {
    '& > *': {
      backgroundColor: (theme: any) => theme.palette.info.lightest + " !important",
      color: (theme: any) => theme.palette.info.darkest + " !important",
      fontWeight: "bold",
    }
  },
}