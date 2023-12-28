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
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getGroups } from "@/lib/supabase-client";
import { GroupDAO } from "@/types/entities";
import AddNewGroupCard from "@/components/dashboard/cards/AddNewGroupCard";

const GroupsPage = () => {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [groups, setGroups] = useState<GroupDAO[]>([]);

    useEffect(() => {
        try {
            getGroups().then((data) => setGroups(data as GroupDAO[]));
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h4">
              Grupos de Contas
          </Typography>
          <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <AddRoundedIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => setShowAdd(!showAdd)}
                >
                  Add
            </Button>
        </Stack>

        {showAdd && (
            <AddNewGroupCard toggle={showAdd} action={setShowAdd} />
        )}
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Ação</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((group) => (
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
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
      </Stack>
    </Container>
    );
};

export default GroupsPage;