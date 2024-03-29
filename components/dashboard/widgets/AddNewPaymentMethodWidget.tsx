import React from 'react';
import Card from "@mui/material/Card";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { styled } from '@mui/material/styles';
import { usePageContext } from '@/lib/hooks';

const AddCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "height",
})<{ height?: string }>(({ theme, height }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "300px",
  height: height || "180px",
  margin: "10px",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
  cursor: "pointer",
  border: "2px dashed",
  borderRadius: "8px",
  borderColor: theme.palette.primary.light,
  color: theme.palette.primary.light,
  transition: "all 0.3s ease",
  "& svg": {
    fontSize: "3.5rem",
  },
}));

const AddNewPaymentMethodWidget = ({height}: {height: string}) => {
  const {actionShowModal} = usePageContext();

  return (
    <AddCard onClick={() => actionShowModal(true)} height={height}>
      <AddCircleOutlineRoundedIcon />
    </AddCard>
  );
};

export default AddNewPaymentMethodWidget;