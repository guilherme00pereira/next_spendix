import { Card, Stack, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";

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

const BankAccountWidget = ({ account }: { account: any }) => {
  useEffect(() => {
    console.log(account);
  }, [account]);
  return (
    <ColoredCard bgcolor={account.color}>
      <Stack>
        <Typography key={account.id} variant="h6">
          {account.bank}
        </Typography>
        <Typography key={account.id} variant="h3" >
          R$ {account.balance}
        </Typography>
      </Stack>
    </ColoredCard>
  );
};

export default BankAccountWidget;
