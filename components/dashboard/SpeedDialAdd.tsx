import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import React from "react";

const dialActions = [
  {icon: <MonetizationOnOutlinedIcon/>, name: "Transação"},
];

const SpeedDialAdd = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial ariaLabel="botões" sx={{position: "fixed", bottom: 32, right: 32}} icon={<SpeedDialIcon/>}
               onClose={handleClose} onOpen={handleOpen} open={open}>
      {dialActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialAdd;