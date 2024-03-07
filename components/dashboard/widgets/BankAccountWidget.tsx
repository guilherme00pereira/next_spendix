import React, { Dispatch, SetStateAction } from "react";
import { Button, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { usePageContext } from "@/lib/hooks";
import { BankAccountFormData } from "@/types/entities";

const ColoredCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{bgcolor?: string}>(({ theme, bgcolor }) => ({
  color: "white",
  backgroundColor: "#" + bgcolor || theme.palette.primary.main,
  padding: "10px",
  width: "300px",
  height: "150px",
  borderRadius: "5px",
  margin: "10px",
}));

const BankAccountWidget = ({ account, action }: { account: BankAccountFormData, action: Dispatch<SetStateAction<BankAccountFormData>> }) => {
  const {showModal, actionShowModal} = usePageContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    action(account);
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
