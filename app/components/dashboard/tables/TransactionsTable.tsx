"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";

const TransactionsTable = ({ children, filters }: {children: React.ReactNode, filters: React.ReactNode}) => {
  
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
    </PaperContainer>
  );
};

export default TransactionsTable;
