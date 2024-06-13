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
import { submitNewInvoiceData } from "@/app/lib/actions/credit-card-actions";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
    const d = dayjs(date).add(selectedCard.due_day - 1, 'day').format("YYYY-MM-DD")
    submitNewInvoiceData({ credit_card_id: selectedCard.id, date: d, amount });
  };

  return (
    <>
      {showNewLine && (
        <ListItem>
          <Box>
            <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
                    <DatePicker
                      format="MM/YYYY"
                      onChange={(v) => setDate(v as string)}
                      value={date}
                      name="date"
                      label="Vencimento"
                      views={['month', 'year']}
                    />
                  </DemoContainer>
                </LocalizationProvider>
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
