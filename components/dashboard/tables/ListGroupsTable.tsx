import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {getGroups, removeGroup} from "@/lib/supabase/methods/groups";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const ListGroupsTable = () => {
    const queryClient = useQueryClient();

    const { data: groups, isLoading } = useQuery({
        queryKey: ["groups"],
        queryFn: () => getGroups(),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => removeGroup(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['groups']});
        },
    })

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading || (groups?.map((group) => (
                        <TableRow
                            key={group.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {group.name}
                            </TableCell>
                            <TableCell align="right">
                                <Button size="small" variant="text" color="info">
                                    <EditRoundedIcon fontSize="small" />
                                </Button>
                                <Button size="small" variant="text" color="error" onClick={() => deleteMutation.mutate(group.id)}>
                                    <DeleteRoundedIcon fontSize="small" />
                                </Button>
                            </TableCell>

                        </TableRow>
                    )))
                    }
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={2} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListGroupsTable;