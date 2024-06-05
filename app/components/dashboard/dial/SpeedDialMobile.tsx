'use client'
import { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import { useSpeedDialStore } from "@/app/lib/store";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import CategoryFormDialog from "../dialogs/CategoryFormDialog";
import IncomeFormDialog from "../dialogs/IncomeFormDialog";
import RecurringFormDialog from "../dialogs/RecurringFormDialog";
import TransactionFormDialog from "../dialogs/TransactionFormDialog";
import { ISpeedDiaDialogsData } from "@/types/interfaces";


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
  bottom: 16,
  right: 24,
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

const SpeedDialMobile = ({categories, tags, paymentMethods}: ISpeedDiaDialogsData) => {
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
        setCategory({ color: null, icon: null, name: "", slug: "", type: "Despesa" });
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
      { showTransactionDialog && <TransactionFormDialog categories={categories} tags={tags} paymentMethods={paymentMethods} /> }
      { showIncomeDialog && <IncomeFormDialog categories={categories} tags={tags} paymentMethods={paymentMethods} /> }
      { showRecurringDialog &&  <RecurringFormDialog /> }
      { showCategoryDialog && <CategoryFormDialog /> }
    </>
  );
};

export default SpeedDialMobile;
