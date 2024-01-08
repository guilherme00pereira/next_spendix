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
import {GroupDAO} from "@/types/entities";
import {getGroups} from "@/lib/supabase/supabase-client";

const ListGroupsTable = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [groups, setGroups] = useState<GroupDAO[]>([]);

    useEffect(() => {
        try {
            getGroups().then((data) => {
                setGroups(data as GroupDAO[]);
                setLoading(false);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

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
                    {loading || (groups.map((group) => (
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
                                <Button size="small" variant="text" color="error">
                                    <DeleteRoundedIcon fontSize="small" />
                                </Button>
                            </TableCell>

                        </TableRow>
                    )))
                    }
                    {loading && (
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