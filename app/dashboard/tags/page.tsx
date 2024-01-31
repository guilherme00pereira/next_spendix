'use client'
import {Stack, Container, Typography, Button, SvgIcon} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {usePageContext} from "@/lib/hooks";
import TagFormDialog from "@/components/dashboard/modals/TagFormDialog";
import ListTagsTable from "@/components/dashboard/tables/ListTagsTable";

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
        <ListTagsTable />
      </Stack>
    </Container>
    );
};

export default TagsPage;