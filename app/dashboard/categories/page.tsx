import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Database } from "@/types/supabase";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const CategoriesPage = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography>
            Categories
        </Typography>
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
                <TableRow
                    key={1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    Category Name
                    </TableCell>
                    <TableCell align="right">Category Slug</TableCell>
                    <TableCell align="right">Category Description</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default CategoriesPage;
