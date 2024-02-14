import {useState} from "react";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import TransactionFormDialog from "./modals/TransactionFormDialog";
import {useSpeedDialStore} from "@/lib/hooks";
import dayjs from "dayjs";
import CategoryFormDialog from "@/components/dashboard/modals/CategoryFormDialog";

const dialActions = [
  {icon: <MonetizationOnOutlinedIcon/>, name: "Transação", handler: "transaction"},
  {icon: <CategoryOutlinedIcon/>, name: "Categoria", handler: "category"}
];

const SpeedDialAdd = () => {
  const {
    setTransaction,
    showTransactionDialog,
    actionShowTransactionDialog,
    setCategory,
    showCategoryDialog,
    actionShowCategoryDialog
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
          times: 2,
          recurring: false,
          payment_date: dayjs(Date.now()),
          payed_amount: 0,
          payment_method: 1
        });
        break;
      case "category":
        actionShowCategoryDialog(true);
        setCategory({name: "", parent: 0, type: "Receita"});
        break;
      default:
        handleClose();
        break;
    }
  };

  return (
    <>
      <SpeedDial ariaLabel="botões" sx={styles.root} icon={<SpeedDialIcon/>} onClose={handleClose} onOpen={handleOpen}
                 open={open}>
        {dialActions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} tooltipOpen
                           onClick={() => handleClick(action.handler)} FabProps={{size: "large"}}/>
        ))}
      </SpeedDial>
      {showTransactionDialog && <TransactionFormDialog/>}
      {showCategoryDialog && <CategoryFormDialog />}
    </>
  );
};

export default SpeedDialAdd;

const styles = {
  root: {
    position: "fixed",
    bottom: 32,
    right: 32,
    "& .MuiSpeedDial-fab": {
      lineHeight: 0.75,
    },
    "& .MuiSpeedDialAction-fab": {
      fontSize: "1.125rem",
      backgroundColor: (theme: any) => theme.palette.primary.main,
      color: (theme: any) => theme.palette.primary.contrastText,
    },
    "& .MuiSpeedDialAction-staticTooltipLabel": {
      fontSize: "1.125rem",
      backgroundColor: (theme: any) => theme.palette.primary.main,
      color: (theme: any) => theme.palette.primary.contrastText,
    },
  },
};
