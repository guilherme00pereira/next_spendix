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

const CreditCardWidget = ({ cc }: { cc: any }) => {
  useEffect(() => {
    console.log(cc);
  }, [cc]);
  return (
    <ColoredCard bgcolor={cc.color}>
      <Stack>
        <Typography key={cc.id} variant="h6">
          {cc.name}
        </Typography>
        <Typography key={cc.id} variant="h3" >
          R$ {cc.current_balance}
        </Typography>
      </Stack>
    </ColoredCard>
  );
};

export default CreditCardWidget;
