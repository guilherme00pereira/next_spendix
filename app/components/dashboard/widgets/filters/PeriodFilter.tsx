import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";


const PeriodFilter = ({items}: {items: string[]}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleClick} startIcon={<CalendarMonthOutlinedIcon />}>
        Período
      </Button>
      <Menu id="period-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem key={item} onClick={() => {}}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PeriodFilter;
