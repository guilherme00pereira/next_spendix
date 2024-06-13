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
import dayjs from "dayjs";

const CreditCardInvoiceListItem = ({ invoice }: { invoice: CreditCardInvoiceType }) => {
  const [showInput, setShowInput] = React.useState(false);
  const [amount, setAmount] = React.useState<string>(invoice.amount.toString());

  const handleEdit = () => {
    setShowInput(!showInput);
    setAmount(invoice.amount.toString());
  }

  const handleSave = () => {
    setShowInput(!showInput);
    submitUpdateInvoiceAmount(invoice.id, parseFloat(amount));
  };

  return (
    <ListItem key={invoice.id}>
      <Box>
        <Typography variant="body2">{dayjs(invoice.date).format("DD/MM/YYYY") }</Typography>
      </Box>
      <Box sx={{ pl: "48px", flexGrow: 1 }}>
        {showInput || <Typography variant="body2" onClick={handleEdit}>{amountFormatter(invoice.amount)}</Typography>}
        {showInput && (
          <FormControl>
            <Input
              id="edit-amount"
              size="small"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
