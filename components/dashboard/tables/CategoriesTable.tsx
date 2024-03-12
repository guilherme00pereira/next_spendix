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
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {ICategoryTableProps} from "@/types/interfaces";
import ChildrenCategoriesTable from "./ChildrenCategoriesTable";
import {CategoryType} from "@/types/entities";


const CategoriesTable = ({handleCategory, categories, handleEdit, handleConfirmDelete}: ICategoryTableProps) => {

  const getSubCategories = (id: number) => {
    const subs = categories?.filter((c) => {
      if (c.parent === id) {
        return {
          id: c.id,
          name: c.name,
          type: c.type,
          parent: c.parent ?? null,
          color: c.color ?? null,
          icon: c.icon ?? null
        }
      }
    });
    return subs as CategoryType[];
  }

  const hasSubCategories = (id: number) => {
    return categories?.filter((c) => c.parent === id).length > 0;
  }

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
            categories?.filter((c) => c.parent === null).map((category) => (
              <>
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
                    <Chip label={category.type} size="small" variant="outlined" color={category.type === "Receita" ? "success" : "secondary"}/>
                  </TableCell>
                  <TableCell align="right">
                    {hasSubCategories(category.id) || (
                      <Button size="small" variant="text" color="info" onClick={() => handleCategory(category.id)}>
                        <VisibilityRoundedIcon fontSize="small"/>
                      </Button>
                    )}
                    <Button size="small" variant="text" color="info" onClick={() => handleEdit(category.id)}>
                      <EditRoundedIcon fontSize="small"/>
                    </Button>
                    <Button size="small" variant="text" color="error"
                            onClick={() => handleConfirmDelete(category.id, category.name)}>
                      <DeleteRoundedIcon fontSize="small"/>
                    </Button>
                  </TableCell>
                </TableRow>
                <ChildrenCategoriesTable
                  subcategories={getSubCategories(category.id)}
                  handleEdit={handleEdit}
                  handleConfirmDelete={handleConfirmDelete}
                  handleView={handleCategory}
                />
              </>
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