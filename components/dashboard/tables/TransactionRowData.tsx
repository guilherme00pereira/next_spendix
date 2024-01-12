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
import { amountFormatter, categoryTypeColor } from "@/lib/functions";
import Tooltip from "@mui/material/Tooltip";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { removeTransaction, updateTransactionCashedStatus } from "@/lib/supabase/methods/transactions";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { usePageContext } from "@/lib/hooks";
import { RemovableEntity, TransactionRowDataProps } from "@/types/interfaces";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/dashboard/modals/ConfirmDeleteDialog";

const getAmountType = (type: string | null) => {
  switch (type) {
    case "Receita":
      return <AddCircleRoundedIcon fontSize="small" color="success" />;
    default:
      return <RemoveCircleRoundedIcon fontSize="small" color="error" />;
  }
};

const TransactionRowData = ({ day, transactions, open }: TransactionRowDataProps) => {
  const queryClient = useQueryClient();
  const { actionShowModal } = usePageContext();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableTransaction, setRemovableTransaction] = useState<RemovableEntity>({ id: 0, name: "", type: "transação" });

  const cashedMutation = useMutation({
    mutationFn: (id: number) => updateTransactionCashedStatus(id),
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

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Dia {day}</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Categoria</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Descrição</TableCell>
                <TableCell align="center">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">{getAmountType(transaction.categories.type)}</TableCell>
                  <TableCell component="th" scope="row">
                    <Stack direction="row" justifyContent="space-around">
                      <Typography variant="body2" fontWeight="bold">
                        {amountFormatter(transaction.amount)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.categories.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography color={categoryTypeColor(transaction.categories.type)} variant="body2" fontWeight="bold">
                      {transaction.categories.type}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" color="text.secondary">
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {transaction.cashed || (
                      <Tooltip title="Marcar como pago" arrow>
                        <Button size="small" variant="text" color="success" onClick={() => cashedMutation.mutate(transaction.id)}>
                          <CheckRoundedIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    )}
                    <Button size="small" variant="text" color="info" onClick={() => actionShowModal(true)}>
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
