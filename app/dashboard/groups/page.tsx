import React from "react";
import Grid from "@mui/material/Grid";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getGroups } from "@/app/lib/supabase/methods/groups";
import GroupsList from "@/app/components/dashboard/lists/GroupsList";
import GroupCategoriesList from "@/app/components/dashboard/lists/GroupCategoriesList";
import GroupProvider from "@/app/lib/providers/GroupProvider";

async function fetchGroups() {
  const res = await getGroups();
  return res;
}

const GroupsPage = async () => {
  const groups = await fetchGroups();

  return (
    <PageContainer title="Grupos de categorias">
      <GroupProvider>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <GroupsList groups={groups} />
          </Grid>
          <Grid item xs={12} md={6}>
            <GroupCategoriesList />
          </Grid>
        </Grid>
      </GroupProvider>
    </PageContainer>
  );
};

export default GroupsPage;
