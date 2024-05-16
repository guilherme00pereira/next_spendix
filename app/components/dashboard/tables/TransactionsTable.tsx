import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

const TransactionsTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
