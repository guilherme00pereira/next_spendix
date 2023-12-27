'use client'
import { useEffect, useState } from "react";
import { Stack, Container, Typography, Button, SvgIcon } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { CategoryDAO } from "@/types/entities";
import { getCategories } from "@/lib/supabase-client";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryDAO[]>([]);

  useEffect(() => {
    try {
      getCategories().then((data) => setCategories(data as CategoryDAO[]));
    } catch (error) {
      console.error(error);
    }
  }, []);
      
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">
              Categorias
          </Typography>
          <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <AddRoundedIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
            </Button>
        </Stack>
        
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
                  {categories.map((category) => (
                    <TableRow
                      key={category.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {category.name}
                      </TableCell>
                      <TableCell align="right">{category.type}</TableCell>
                      <TableCell align="right">X</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default CategoriesPage;