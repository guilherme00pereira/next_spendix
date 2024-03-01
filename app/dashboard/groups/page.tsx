'use client'
import {Stack, Container, Typography, Button, SvgIcon} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GroupFormDialog from "@/components/dashboard/dialogs/GroupFormDialog";
import GroupsTable from "@/components/dashboard/tables/GroupsTable";
import {usePageContext} from "@/lib/hooks";

const GroupsPage = () => {
    const {showModal, actionShowModal} = usePageContext();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
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
        <GroupsTable />

      </Stack>
    </Container>
    );
};

export default GroupsPage;