import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, Chip, Typography} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {ICategoryListProps} from "@/types/interfaces";


const getTypeColor = (type: string) => {
  switch (type) {
    case "Receita":
      return "success";
    case "Despesa":
      return "secondary";
    default:
      return "primary";
  }
}


const CategoriesTable = ({categories, handleEdit, handleConfirmDelete}: ICategoryListProps) => {

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Nome</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { categories.length > 0 &&
            categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                  <TableCell component="th" scope="row" colSpan={2}>
                    <Link href={`/dashboard/categories/${category.slug}`}>
                      {category.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Chip label={category.type} size="small" variant="outlined" color={getTypeColor(category.type)}/>
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="text" color="info" onClick={() => handleEdit(category.id)}>
                      <EditRoundedIcon fontSize="small"/>
                    </Button>
                    <Button size="small" variant="text" color="error"
                            onClick={() => handleConfirmDelete(category.id, category.name)}>
                      <DeleteRoundedIcon fontSize="small"/>
                    </Button>
                  </TableCell>
                </TableRow>
            ))}
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Nenhuma categoria cadastrada
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;