import React from "react";
import Icon from "@mui/material/Icon";
import { Dialog, DialogContent } from "@mui/material";

const ChooseIconDialog = () => {
  return (
    <Dialog open={false} fullWidth maxWidth="md">
      <DialogContent>
        <Icon>add_circle</Icon>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseIconDialog;
