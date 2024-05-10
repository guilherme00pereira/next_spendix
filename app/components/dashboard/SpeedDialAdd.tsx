'use client'
import { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import TransactionFormDialog from "@/app/components/dashboard/dialogs/TransactionFormDialog";
import { useSpeedDialStore } from "@/app/lib/store";
import dayjs from "dayjs";
import CategoryFormDialog from "@/app/components/dashboard/dialogs/CategoryFormDialog";
import { styled } from "@mui/material/styles";
import RecurringFormDialog from "./dialogs/RecurringFormDialog";
import IncomeFormDialog from "./dialogs/IncomeFormDialog";


const TransactionDefaultData = {
  amount: 0,
  category_id: 3,
  cashed: true,
  description: "",
  due_date: dayjs().format("YYYY-MM-DD"),
  in_installments: false,
  installments: 2,
  payment_date: dayjs().format("YYYY-MM-DD"),
  payed_amount: 0,
  payment_method_id: 1,
  payment_id: null,
  draft: false,
  tags: [],
}

const dialActions = [
  { icon: <ShoppingCartCheckoutOutlinedIcon />, name: "Despesa", handler: "transaction" },
  { icon: <MonetizationOnOutlinedIcon />, name: "Receita", handler: "income" },
  { icon: <EventRepeatOutlinedIcon />, name: "Recorrente", handler: "recurring" },
  { icon: <CategoryOutlinedIcon />, name: "Categoria", handler: "category" },

];

const SpeedDialButton = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  bottom: 32,
  right: 32,
  "& .MuiSpeedDial-fab": {
    lineHeight: 0.75,
    width: "42px",
    height: "42px",
    backgroundColor: theme.palette.primary.dark,
  },
  "& .MuiSpeedDialAction-fab, .MuiSpeedDialAction-staticTooltipLabel": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

const SpeedDialAdd = () => {
  const {
    setTransaction,
    showTransactionDialog,
    actionShowTransactionDialog,
    setIncome,
    showIncomeDialog,
    actionShowIncomeDialog,
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
        setTransaction(TransactionDefaultData);
        break;
      case "income":
        actionShowIncomeDialog(true);
        setIncome(TransactionDefaultData);
        break;
      case "category":
        actionShowCategoryDialog(true);
        setCategory({ color: null, icon: null, name: "", slug: "", parent: 0, type: "Despesa" });
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
            FabProps={{ size: "small" }}
          />
        ))}
      </SpeedDialButton>
      {showTransactionDialog && <TransactionFormDialog />}
      {showRecurringDialog && <RecurringFormDialog />}
      {showCategoryDialog && <CategoryFormDialog />}
      {showIncomeDialog && <IncomeFormDialog />}
    </>
  );
};

export default SpeedDialAdd;
