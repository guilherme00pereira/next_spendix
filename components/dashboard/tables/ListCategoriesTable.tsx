import {useState} from "react";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, CircularProgress, Typography} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {getCategories, removeCategory} from "@/lib/supabase/methods/categories";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/dashboard/modals/ConfirmDeleteDialog";
import {categoryTypeColor} from "@/lib/functions";

const ListCategoriesTable = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({id: 0, name: '', type: 'categoria'});

    const {data: categories, isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => removeCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
        },
    })

    const handleConfirmDelete = (id: number, name: string) => {
        setCategory({id, name, type: 'categoria'});
        setOpen(true);
    }

    const processDelete = () => {
        deleteMutation.mutate(category.id);
        setOpen(false);
    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link href={`/dashboard/categories/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color={categoryTypeColor(category.type)} variant="body2" fontWeight="bold">
                                            {category.type}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button size="small" variant="text" color="info">
                                            <EditRoundedIcon fontSize="small"/>
                                        </Button>
                                        <Button size="small" variant="text" color="error"
                                                onClick={() => handleConfirmDelete(category.id, category.name)}>
                                            <DeleteRoundedIcon fontSize="small"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <CircularProgress/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDeleteDialog entity={category} open={open} handleClose={setOpen} handleDelete={processDelete}/>
        </>
    );
};

export default ListCategoriesTable;
