import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTransactionContext } from "@/lib/hooks";
import { Typography } from "@mui/material";
import { amountFormatter } from "@/lib/functions";
import dayjs from "dayjs";

const RightDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  "& .MuiDrawer-paper": {
    width: "400px",
    padding: "16px",
  },
}));

const TransactionDetailRightDrawer = () => {
  const { selectedTransaction, showTransactionDetail, actionShowTransactionDetail } = useTransactionContext();

  return (
    <RightDrawer anchor="right" open={showTransactionDetail} onClose={() => actionShowTransactionDetail(!showTransactionDetail)}>
      <Typography variant="h6">Detalhes da transação</Typography>
      {selectedTransaction && (
        <List>
          <ListItem>
            <ListItemText primary="ID" secondary={selectedTransaction.id} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Tipo" secondary={selectedTransaction.categories?.type} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Categoria" secondary={selectedTransaction.categories?.name} />
            </ListItem>
          <ListItem>
            <ListItemText primary="Descrição" secondary={selectedTransaction.description} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data de vencimento" secondary={dayjs(selectedTransaction.due_date).format('DD/MM/YYYY')} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Valor devido " secondary={amountFormatter(selectedTransaction.amount)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data de pagamento" secondary={dayjs(selectedTransaction.payments?.date).format('DD/MM/YYYY')} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Valor pago" secondary={amountFormatter(selectedTransaction.payments?.amount ?? 0)} />
          </ListItem>
        </List>
      )}
    </RightDrawer>
  );
};

export default TransactionDetailRightDrawer;
