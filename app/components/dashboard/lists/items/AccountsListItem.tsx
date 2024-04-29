"use client";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { amountFormatter } from "@/app/lib/functions";
import { BankAccountType } from "@/types/entities";
import { useBankAccountContext, usePageContext } from "@/app/lib/contexts";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

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

const FirstLetter = styled(Chip)(({ theme }) => ({
  color: 'white',
  fontWeight: "bold",
  width: "32px",
  "& .MuiChip-label": {
    padding: 0,
  },
}));

const AccountsListItem = ({ account }: { account: BankAccountType }) => {
  const { showModal, actionShowModal } = usePageContext();
  const { setEditableObject } = useBankAccountContext();

  const handleEdit = () => {
    actionShowModal(!showModal);
    setEditableObject(account);
  };

  return (
    <ListItem
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{color: "#" + account.color + " !important"}}
    >
      <Box sx={{ mr: 2 }}>
        <FirstLetter
          label={account.bank.charAt(0)}
          sx={{backgroundColor: "#" + account.color + " !important"}} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">{account.bank}</Typography>
      </Box>
      <Box>{amountFormatter(account.balance)}</Box>
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

export default AccountsListItem;
