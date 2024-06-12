"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { DangerActionButton, ListItem, OutlinedButtonWithHover, SuccessActionButton } from "@/app/components/dashboard/commonStyledComponents";
import { useCreditCardContext } from "@/app/lib/contexts";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { InputLabel } from "@mui/material";
import { submitInvoiceForm } from "@/app/lib/actions/credit-card-actions";

const AddNewInvouce = () => {
  const { selectedCard } = useCreditCardContext();
  const [showNewLine, setShowNewLine] = useState(false);
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleAdd = () => {
    setShowNewLine(true);
    console.log("New invoice");
  };

  const handleSave = () => {
    setShowNewLine(false);
    submitInvoiceForm({ credit_card_id: selectedCard.id, date, amount });
  };

  return (
    <>
      {showNewLine && (
        <ListItem>
          <Box>
            <FormControl>
              <InputLabel htmlFor="edit-amount">Date</InputLabel>
              <Input id="edit-amount" size="small" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
          </Box>
          <Box sx={{ pl: "12px", flexGrow: 1 }}>
            <FormControl>
            <InputLabel htmlFor="edit-amount">Amount</InputLabel>
              <Input id="edit-amount" size="small" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </FormControl>
          </Box>
          <Stack direction="row" spacing={2}>
            <DangerActionButton size="small" variant="text" onClick={() => setShowNewLine(false)}>
              <CloseOutlinedIcon />
            </DangerActionButton>
            <SuccessActionButton size="small" variant="text" onClick={handleSave}>
              <DoneOutlinedIcon />
            </SuccessActionButton>
          </Stack>
        </ListItem>
      )}
      <ListItem>
        <Box>
          <OutlinedButtonWithHover variant="outlined" size="small" color="primary" startIcon={<AddRoundedIcon />} onClick={handleAdd}>
            New invoice
          </OutlinedButtonWithHover>
        </Box>
      </ListItem>
    </>
  );
};

export default AddNewInvouce;
