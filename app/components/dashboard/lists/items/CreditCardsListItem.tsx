"use client";
import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { CreditCardType } from "@/types/entities";
import Typography from "@mui/material/Typography";
import { usePageContext, useCreditCardContext } from "@/app/lib/contexts";
import CreditCardActionButtons from "@/app/components/dashboard/widgets/buttons/CreditCardActionButtons";
import { amountFormatter } from "@/app/lib/functions";

const ListItem = styled(Stack)(({ theme }) => ({
  width: "100%",
  margin: "4px 0",
  padding: "8px 16px",
  backgroundColor: theme.vars.palette.background.paper,
  borderBlockEnd: "1px solid",
  borderColor: theme.vars.palette.divider,
  "&:hover": {
    backgroundColor: theme.vars.palette.action.hover,
  },
}));

const CreditCardBox = styled(Stack)(({ theme }) => ({
  position: "relative",
  alignItems: "center",
  padding: "2px 4px",
  color: "white",
  borderRadius: "8px",
  width: "180px",
  height: "100px",
  "& .MuiTypography-root": {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
}));

const CreditCardsListItem = ({ card }: { card: CreditCardType }) => {
  const { showModal, actionShowModal } = usePageContext();
  const { setEditableObject } = useCreditCardContext();

  const avaliableAmount = useMemo(() => {
    if (card.credit_cards_invoices) {
      const invoicesSum = card.credit_cards_invoices.reduce((acc, invoice) => acc + invoice.amount, 0);
      return card.limit - invoicesSum;
    }
    return 0;
  }, [card]);

  return (
    <ListItem
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ color: "#" + card.color + " !important" }}
    >
      <CreditCardBox
        direction="column"
        justifyContent="space-between"
        alignItems="end"
        sx={{ backgroundColor: "#" + card.color + " !important" }}
      >
        <Typography variant="subtitle2">
          {card.name}
        </Typography>
      </CreditCardBox>
      <Stack direction="row" justifyContent="space-evenly" sx={{ flexGrow: 1 }} spacing={3}>
        <Stack>
          <Typography variant="subtitle2" color="textSecondary">
            Limite: {amountFormatter(card.limit)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Vencimento: {card.due_day}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Fechamento: {card.closing_day}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle2" color="textSecondary">
            Disponível: {amountFormatter(avaliableAmount)}
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <CreditCardActionButtons card={card} />
      </Box>
    </ListItem>
  );
};

export default CreditCardsListItem;
