import {Dispatch, SetStateAction, useState} from "react";
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
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {getCategories, removeCategory} from "@/lib/supabase/methods/categories";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/dashboard/modals/ConfirmDeleteDialog";
import {categoryTypeColor} from "@/lib/functions";
import {usePageContext} from "@/lib/hooks";
import {CategoryForm} from "@/types/entities";

const ListCategoriesTable = ({handler}: {handler: Dispatch<SetStateAction<CategoryForm>>}) => {
    const queryClient = useQueryClient();
    const {actionShowModal} = usePageContext();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [removableCategory, setRemovableCategory] = useState<CategoryForm>({id: 0, name: '', type: 'Receita'});

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

    const handleEdit = (id: number) => {
        actionShowModal(true);
        handler({
            id,
            name: categories?.filter(category => category.id === id)[0].name ?? "",
            type: categories?.filter(category => category.id === id)[0].type ?? "Receita"
        })
    }

    const handleConfirmDelete = (id: number, name: string) => {
        setRemovableCategory({id, name, type: null});
        setOpenConfirm(true);
    }

    const processDelete = () => {
        if(typeof removableCategory.id !== 'undefined') {
            deleteMutation.mutate(removableCategory?.id);
            setOpenConfirm(false);
        }
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
                                        <Link href={`/dashboard/categories/${category.id}`}>
                                            <Button size="small" variant="text" color="info">
                                                <VisibilityRoundedIcon fontSize="small"/>
                                            </Button>
                                        </Link>
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
            <ConfirmDeleteDialog entity={removableCategory} open={openConfirm} handleClose={setOpenConfirm} handleDelete={processDelete}/>
        </>
    );
};

export default ListCategoriesTable;
