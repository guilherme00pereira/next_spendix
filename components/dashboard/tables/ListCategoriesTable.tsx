import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import Chip from "@mui/material/Chip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { CategoryDAO } from "@/types/entities";
import { getCategories } from "@/lib/supabase/supabase-client";
import { useQuery } from "@tanstack/react-query";

const getBadgeColor = (type: string | null) => {
  switch (type) {
    case "Receita":
      return <Chip color="success" label={type} />;
    case "Despesa Fixa":
      return <Chip color="secondary" label={type} />;
    default:
      return <Chip color="warning" label={type} />;
  }
};

const ListCategoriesTable = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ||
            categories?.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">
                  {getBadgeColor(category.type)}
                </TableCell>
                <TableCell align="right">
                  <Button size="small" variant="text" color="info">
                    <EditRoundedIcon fontSize="small" />
                  </Button>
                  <Button size="small" variant="text" color="error">
                    <DeleteRoundedIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListCategoriesTable;
