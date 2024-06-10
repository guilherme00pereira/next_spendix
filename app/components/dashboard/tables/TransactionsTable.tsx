"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import { useTransactionContext } from "@/app/lib/contexts";

const TransactionsTable = ({ children, filters }: {children: React.ReactNode, filters?: React.ReactNode}) => {
  const { openConfirm, setOpenConfirm, removableTransaction, setRemovableTransaction } = useTransactionContext();
  
  const handleProceedDelete = () => {
    fetch(`/api/transactions/remove?id=${removableTransaction.id}&payment_id=${removableTransaction.payment_id}`, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        setOpenConfirm(false);
      }
    });
  };

  return (
    <PaperContainer sx={{width: "100%"}}>
      <PaperHeader title="Transações">
        {filters}
      </PaperHeader>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          {children}
        </Table>
      </TableContainer>
      <ConfirmDeleteDialog entity={removableTransaction} open={openConfirm} handleClose={setOpenConfirm} handleDelete={handleProceedDelete} />
    </PaperContainer>
  );
};

export default TransactionsTable;
