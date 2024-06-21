import Stack from "@mui/material/Stack";
import TagList from "@/app/components/dashboard/lists/TagList";
import TagFormDialog from "@/app/components/dashboard/dialogs/TagFormDialog";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TagProvider from "@/app/lib/providers/TagProvider";
import { getTags } from "@/app/lib/supabase/methods/tags";

const TagsPage =  async () => {
  const tags = await getTags();

  return (
      <PageContainer title="Tags">
        <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="start"
        alignItems="start"
        spacing={2}
        sx={{ width: "100%" }}
      >

        <TagProvider>
          <TagList tags={tags} />
          <TagFormDialog />
        </TagProvider>
      </Stack>
      </PageContainer>
  );
};

export default TagsPage;
