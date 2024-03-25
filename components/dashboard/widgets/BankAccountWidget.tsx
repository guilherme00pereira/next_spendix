import React from "react";
import { Button, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {useBankAccountContext, usePageContext} from "@/lib/hooks";
import { BankAccountType } from "@/types/entities";

const ColoredCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{bgcolor?: string}>(({ theme, bgcolor }) => ({
  color: "white",
  backgroundColor: "#" + bgcolor || theme.palette.primary.main,
  padding: "10px",
  width: "300px",
  height: "130px",
  borderRadius: "8px",
  margin: "10px",
}));

const BankAccountWidget = ({account}: {account: BankAccountType}) => {
  const {showModal, actionShowModal} = usePageContext();
  const {setEditableAccount} = useBankAccountContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableAccount(account);
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
        
        <Typography key={account.id} variant="h3" >
          R$ {account.balance}
        </Typography>
      </Stack>
    </ColoredCard>
  );
};

export default BankAccountWidget;
