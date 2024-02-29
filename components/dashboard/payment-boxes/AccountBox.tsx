import { Card, Stack, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";

const ColoredCard = styled(Card)(({ theme }) => ({
  color: "white",
  backgroundColor: "#3f51b5",
  padding: "10px",
  width: "300px",
  height: "150px",
  borderRadius: "5px",
  margin: "10px",
}));

const AccountBox = ({ account }: { account: any }) => {
  useEffect(() => {
    console.log(account);
  }, [account]);
  return (
    <ColoredCard>
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

export default AccountBox;
