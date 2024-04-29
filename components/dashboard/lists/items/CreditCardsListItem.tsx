"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { amountFormatter } from "@/lib/functions";
import { CreditCardType } from "@/types/entities";
import Typography from "@mui/material/Typography";
import { usePageContext, useCreditCardContext } from "@/lib/contexts";

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

const CreditCardsListItem = ({ card }: { card: CreditCardType }) => {
  const { showModal, actionShowModal } = usePageContext();
  const { setEditableObject } = useCreditCardContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableObject(card);
  };

  return (
    <ListItem direction="row" justifyContent="space-between" alignItems="center" sx={{ color: "#" + card.color + " !important" }}>
        <Box>
            <Typography fontWeight="bold">{card.id}</Typography>
        </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">{card.name}</Typography>
      </Box>
      <Box>
        <Stack direction="row" spacing={1}>
          <Box>
            <Button
              size="small"
              variant="text"
              color="info"
              onClick={handleEdit}
            >
              <EditRoundedIcon fontSize="small" />
            </Button>
          </Box>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CreditCardsListItem;
