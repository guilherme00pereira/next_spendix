import TagList from "@/app/components/dashboard/lists/TagList";
import TagFormDialog from "@/app/components/dashboard/dialogs/TagFormDialog";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import TagProvider from "@/app/context-providers/TagProvider";

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
