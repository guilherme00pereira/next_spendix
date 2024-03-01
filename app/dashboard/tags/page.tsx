'use client'
import {Stack, Container, Typography, Button, SvgIcon} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {usePageContext} from "@/lib/hooks";
import TagFormDialog from "@/components/dashboard/dialogs/TagFormDialog";
import TagsTable from "@/components/dashboard/tables/TagsTable";

const TagsPage = () => {
    const {showModal, actionShowModal} = usePageContext();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">
              Tags
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
            <TagFormDialog />
        )}
        <TagsTable />
      </Stack>
    </Container>
    );
};

export default TagsPage;