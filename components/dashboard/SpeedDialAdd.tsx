import { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import TransactionFormDialog from "@/components/dashboard/dialogs/TransactionFormDialog";
import { useSpeedDialStore } from "@/lib/hooks";
import dayjs from "dayjs";
import CategoryFormDialog from "@/components/dashboard/dialogs/CategoryFormDialog";
import { styled } from "@mui/material/styles";
import RecurringFormDialog from "./dialogs/RecurringFormDialog";

const dialActions = [
  { icon: <MonetizationOnOutlinedIcon />, name: "Transação", handler: "transaction" },
  { icon: <EventRepeatOutlinedIcon />, name: "Recorrente", handler: "recurring" },
  { icon: <CategoryOutlinedIcon />, name: "Categoria", handler: "category" },
];

const SpeedDialButton = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  bottom: 32,
  right: 32,
  "& .MuiSpeedDial-fab": {
    lineHeight: 0.75,
  },
  "& .MuiSpeedDialAction-fab, .MuiSpeedDialAction-staticTooltipLabel": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const SpeedDialAdd = () => {
  const {
    setTransaction,
    showTransactionDialog,
    actionShowTransactionDialog,
    setCategory,
    showCategoryDialog,
    actionShowCategoryDialog,
    setRecurring,
    showRecurringDialog,
    actionShowRecurringDialog,
  } = useSpeedDialStore();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (entity: string) => {
    switch (entity) {
      case "transaction":
        actionShowTransactionDialog(true);
        setTransaction({
          amount: 0,
          category_id: 3,
          cashed: true,
          description: "",
          due_date: dayjs(Date.now()),
          in_installments: false,
          installments: 2,
          payment_date: dayjs(Date.now()),
          payed_amount: 0,
          payment_method_id: 1,
        });
        break;
      case "category":
        actionShowCategoryDialog(true);
        setCategory({ color: null, icon: null, name: "", parent: 0, type: "Despesa" });
        break;
      case "recurring":
        actionShowRecurringDialog(true);
        setRecurring({ amount: 0, category_id: 3, description: "", due_date: dayjs(Date.now()), recurring: false, recurring_times: 2 });
        break;
      default:
        handleClose();
        break;
    }
  };

  return (
    <>
      <SpeedDialButton ariaLabel="botões" icon={<SpeedDialIcon />} onClose={handleClose} onOpen={handleOpen} open={open}>
        {dialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action.handler)}
            FabProps={{ size: "large" }}
          />
        ))}
      </SpeedDialButton>
      {showTransactionDialog && <TransactionFormDialog />}
      {showRecurringDialog && <RecurringFormDialog />}
      {showCategoryDialog && <CategoryFormDialog />}
    </>
  );
};

export default SpeedDialAdd;
