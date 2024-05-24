import {useState} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AddButton = () => {
  const [anchorAdd, setAnchorAdd] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button variant="contained" onClick={(e) => setAnchorAdd(e.currentTarget)} endIcon={<KeyboardArrowDownIcon />}>
        Add
      </Button>
      <Menu id="menu-add" anchorEl={anchorAdd} keepMounted open={Boolean(anchorAdd)} onClose={() => setAnchorAdd(null)}>
        <MenuItem onClick={() => console.log('')}>Transaction</MenuItem>
        <MenuItem onClick={() => console.log('')}>Income</MenuItem>
        <MenuItem onClick={() => console.log('')}>Expense</MenuItem>
      </Menu>
    </>
  );
};

export default AddButton;
