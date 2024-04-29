import React from "react";
import { Button, Card, Stack, Typography, styled } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useCreditCardContext, usePageContext } from "@/app/lib/contexts";
import { amountFormatter } from "@/app/lib/functions";

const ColoredCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "bgcolor",
})<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
  color: "white",
  backgroundColor: "#" + bgcolor || theme.palette.primary.main,
  padding: "10px",
  width: "280px",
  height: "160px",
  borderRadius: "8px",
  margin: "10px",
}));

const CreditCardWidget = ({ cc }: { cc: any }) => {
  const { showModal, actionShowModal } = usePageContext();
  const { setEditableObject } = useCreditCardContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableObject(cc);
  };

  return (
    <ColoredCard bgcolor={cc.color}>
      <Stack justifyContent="space-between" height="100%" alignItems="end">
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography key={cc.id} variant="h6">
            {cc.name}
          </Typography>
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={handleEdit}
          >
            <EditRoundedIcon fontSize="small" />
          </Button>
        </Stack>
        <Stack sx={{width: "75%"}} justifyContent="flex-end">
          <Stack direction="row" justifyContent="space-between">
            <Typography key={cc.id} variant="subtitle1">
              Vencimento
            </Typography>
            <Typography key={cc.id} variant="subtitle1">
              {cc.due_day}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography key={cc.id} variant="subtitle1">
              Fatura
            </Typography>
            <Typography key={cc.id} variant="h5">
              {amountFormatter(cc.current_invoice)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography key={cc.id} variant="subtitle1">
              Saldo
            </Typography>
            <Typography key={cc.id} variant="h5">
              {amountFormatter(cc.current_balance)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </ColoredCard>
  );
};

export default CreditCardWidget;
