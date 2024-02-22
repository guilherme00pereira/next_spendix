import React from 'react';

import TableCell from "@mui/material/TableCell";
import Link from "next/link";
import {Button, Typography} from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import TableRow from "@mui/material/TableRow";
import {ChildrenCategoriesProps} from "@/types/interfaces";

const ListChildrenCategories = ({subcategories, handleEdit, handleConfirmDelete, handleView}: ChildrenCategoriesProps ) => {
  return (
    <>
      {subcategories.length > 0 && subcategories.map((category: any) => (
        <TableRow
          key={category.id}
          sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
          <TableCell>
            <SubdirectoryArrowRightRoundedIcon fontSize="small"/>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link href={`/dashboard/categories/${category.id}`}>
              {category.name}
            </Link>
          </TableCell>
          <TableCell align="right">
            <Typography color={category.type === "Receita" ? "success.main" : "secondary.main"}
                        variant="body2" fontWeight="bold">
              {category.type === "Receita" ? "R" : "D"}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Button size="small" variant="text" color="info" onClick={() => handleView(category.id)}>
                <VisibilityRoundedIcon fontSize="small"/>
            </Button>
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
    </>
  );
};

export default ListChildrenCategories;