import { Card, Stack, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";

const ColoredCard = styled(Card)(({ theme }) => ({
  color: "white",
  backgroundColor: "#333",
  padding: "10px",
  width: "300px",
  height: "150px",
  borderRadius: "5px",
  margin: "10px",
}));

const CreditCardBox = ({ account }: { account: any }) => {
  useEffect(() => {
    console.log(account);
  }, [account]);
  return (
    <ColoredCard>
      <Stack>
        <Typography key={account.id} variant="h6">
          {account.name}
        </Typography>
        <Typography key={account.id} variant="h3" >
          R$ {account.current_balance}
        </Typography>
      </Stack>
    </ColoredCard>
  );
};

export default CreditCardBox;
