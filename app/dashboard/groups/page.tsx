'use client'
import { useState } from "react";
import {Stack, Container, Typography, Button, SvgIcon} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupFormDialog from "@/components/dashboard/modals/GroupFormDialog";
import ListGroupsTable from "@/components/dashboard/tables/ListGroupsTable";
import {usePageContext} from "@/lib/hooks";

const GroupsPage = () => {
    const {showModal, actionShowModal} = usePageContext();

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
                  onClick={() => actionShowModal(true)}
                >
                  Add
            </Button>
        </Stack>

        {showModal && (
            <GroupFormDialog />
        )}
        <ListGroupsTable />

      </Stack>
    </Container>
    );
};

export default GroupsPage;