import React from "react";
import { Button, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {useBankAccountContext, usePageContext} from "@/lib/contexts";
import { BankAccountType } from "@/types/entities";

const ColoredCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{bgcolor?: string}>(({ theme, bgcolor }) => ({
  color: "white",
  backgroundColor: "#" + bgcolor || theme.palette.primary.main,
  padding: "10px",
  width: "200px",
  height: "110px",
  borderRadius: "8px",
  margin: "10px",
}));

const BankAccountWidget = ({account}: {account: BankAccountType}) => {
  const {showModal, actionShowModal} = usePageContext();
  const {editableObject, setEditableObject} = useBankAccountContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableObject(account);
  };
  
  return (
    <ColoredCard bgcolor={account.color}>
      <Stack justifyContent="space-between" sx={{height: "100%"}}>
        <Stack direction="row" justifyContent="space-between">
          <Typography key={account.id} variant="h6">
            {account.bank}
          </Typography>
          <Button size="small" variant="text" color="inherit" onClick={handleEdit}>
            <EditRoundedIcon fontSize="small" />
          </Button>
        </Stack>
        
        <Typography key={account.id} variant="h4" >
          R$ {account.balance}
        </Typography>
      </Stack>
    </ColoredCard>
  );
};

export default BankAccountWidget;
