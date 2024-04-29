import TagList from "@/components/dashboard/lists/TagList";
import TagFormDialog from "@/components/dashboard/dialogs/TagFormDialog";
import PageContainer from "@/components/dashboard/page/PageContainer";
import TagProvider from "@/components/context-providers/TagProvider";

const TagsPage = () => {

  return (
      <PageContainer title="Tags">
        <TagProvider>
          <TagList />
          <TagFormDialog />
        </TagProvider>
      </PageContainer>
  );
};

export default TagsPage;
