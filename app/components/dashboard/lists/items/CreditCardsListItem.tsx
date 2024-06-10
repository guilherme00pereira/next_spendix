"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { CreditCardType } from "@/types/entities";
import Typography from "@mui/material/Typography";
import { usePageContext, useCreditCardContext } from "@/app/lib/contexts";
import CreditCardActionButtons from "@/app/components/dashboard/widgets/buttons/CreditCardActionButtons";

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
  alignItems: "center",
  padding: "2px 4px",
  color: "white",
  borderRadius: "8px",
  width: "140px",
  height: "80px",
}));

const CreditCardsListItem = ({ card }: { card: CreditCardType }) => {
  const { showModal, actionShowModal } = usePageContext();
  const { setEditableObject } = useCreditCardContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableObject(card);
  };

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
        <Typography fontWeight="bold" fontSize="0.75rem">{card.name}</Typography>
      </CreditCardBox>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">{card.name}</Typography>
      </Box>
      <Box>
        <CreditCardActionButtons card={card} />
      </Box>
    </ListItem>
  );
};

export default CreditCardsListItem;
