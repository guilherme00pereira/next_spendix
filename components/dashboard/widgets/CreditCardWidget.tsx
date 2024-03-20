import React from "react";
import { Button, Card, Stack, Typography, styled } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useCreditCardContext, usePageContext } from "@/lib/hooks";

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
  const {showModal, actionShowModal} = usePageContext();
  const {setEditableCard} = useCreditCardContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableCard(cc);
  };

  
  return (
    <ColoredCard bgcolor={cc.color}>
      <Stack justifyContent="space-between" sx={{height: "100%"}}>
      <Stack direction="row" justifyContent="space-between">
        <Typography key={cc.id} variant="h6">
          {cc.name}
        </Typography>
        <Button size="small" variant="text" color="inherit" onClick={handleEdit}>
            <EditRoundedIcon fontSize="small" />
          </Button>
        </Stack>
        <Typography key={cc.id} variant="h3" >
          R$ {cc.current_balance}
        </Typography>
      </Stack>
    </ColoredCard>
  );
};

export default CreditCardWidget;
