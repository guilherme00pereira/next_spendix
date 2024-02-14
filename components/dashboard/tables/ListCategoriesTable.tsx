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
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {getCategories, removeCategory} from "@/lib/supabase/methods/categories";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ConfirmDeleteDialog from "@/components/dashboard/modals/ConfirmDeleteDialog";
import {useSpeedDialStore} from "@/lib/hooks";
import { RemovableEntity } from "@/types/interfaces";
import ListChildrenCategories from "./ListChildrenCategories";
import {CategoryType} from "@/types/entities";

const ListCategoriesTable = () => {
    const queryClient = useQueryClient();
    const {actionShowCategoryDialog, setCategory} = useSpeedDialStore();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [removableCategory, setRemovableCategory] = useState<RemovableEntity>({id: 0, name: '', type: 'categoria'});

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
        actionShowCategoryDialog(true);
        const c = categories?.filter(category => category.id === id)[0] ?? {} as CategoryType;
        setCategory({
            id,
            name: c.name ?? "",
            type: c.type ?? "Receita",
            parent: c.parent ?? 0,
            color: c.color ?? null,
            icon: c.icon ?? null
        })
    }

    const handleConfirmDelete = (id: number, name: string) => {
        setRemovableCategory({...removableCategory, id, name});
        setOpenConfirm(true);
    }

    const processDelete = () => {
        if(removableCategory.id > 0) {
            deleteMutation.mutate(removableCategory.id);
            setOpenConfirm(false);
        }
    }

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

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>Nome</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ||
                            categories?.filter((c) => c.parent === null).map((category) => (
                              <>
                                <TableRow
                                    key={category.id}
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" colSpan={2}>
                                        <Link href={`/dashboard/categories/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color={category.type === "Receita" ? "success.main" : "secondary.main"}
                                                    variant="body2" fontWeight="bold">
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
                                <ListChildrenCategories
                                  subcategories={getSubCategories(category.id)}
                                  handleEdit={handleEdit}
                                  handleConfirmDelete={handleConfirmDelete}
                                />
                              </>
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
