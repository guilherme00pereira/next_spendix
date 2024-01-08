'use client'
import { useState } from "react";
import {Stack, Container, Typography, Button, SvgIcon} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddNewGroupDialog from "@/components/dashboard/modals/AddNewGroupDialog";
import ListGroupsTable from "@/components/dashboard/tables/ListGroupsTable";

const GroupsPage = () => {
    const [showAdd, setShowAdd] = useState<boolean>(false);

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
                  onClick={() => setShowAdd(true)}
                >
                  Add
            </Button>
        </Stack>

        {showAdd && (
            <AddNewGroupDialog toggle={showAdd} action={setShowAdd} />
        )}
        <ListGroupsTable />

      </Stack>
    </Container>
    );
};

export default GroupsPage;