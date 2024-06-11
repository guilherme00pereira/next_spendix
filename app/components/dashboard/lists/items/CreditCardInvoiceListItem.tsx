import React from "react";
import Box from "@mui/material/Box";
import { FormControl, IconButton, Input, Typography } from "@mui/material";
import { CreditCardInvoiceType } from "@/types/entities";
import { InfoActionButton, SuccessActionButton, ListItem } from "@/app/components/dashboard/commonStyledComponents";
import { amountFormatter } from "@/app/lib/functions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { submitUpdateInvoiceAmount } from "@/app/lib/actions/credit-card-actions";

const CreditCardInvoiceListItem = ({ invoice }: { invoice: CreditCardInvoiceType }) => {
  const [showInput, setShowInput] = React.useState(false);
  const [amount, setAmount] = React.useState(invoice.amount);

  const handleEdit = () => {
    setShowInput(!showInput);
    setAmount(invoice.amount);
  }

  const handleSave = () => {
    setShowInput(!showInput);
    submitUpdateInvoiceAmount(invoice.id, amount);
  };

  return (
    <ListItem key={invoice.id}>
      <Box>
        <Typography variant="body2">{invoice.date}</Typography>
      </Box>
      <Box sx={{ pl: "48px", flexGrow: 1 }}>
        {showInput || <Typography variant="body2">{amountFormatter(invoice.amount)}</Typography>}
        {showInput && (
          <FormControl>
            <Input
              id="edit-amount"
              size="small"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              endAdornment={
                  <IconButton onClick={() => setShowInput(!showInput)} color="primary" size="small">
                    <CloseOutlinedIcon color="action" fontSize="small" />
                  </IconButton>
               }
            />
          </FormControl>
        )}
      </Box>
      <Box>
        {showInput || (
          <InfoActionButton size="small" variant="text" onClick={handleEdit}>
            <EditOutlinedIcon />
          </InfoActionButton>
        )}
        {showInput && (
          <SuccessActionButton size="small" variant="text" onClick={handleSave}>
            <DoneOutlinedIcon />
          </SuccessActionButton>
        )}
      </Box>
    </ListItem>
  );
};

export default CreditCardInvoiceListItem;
