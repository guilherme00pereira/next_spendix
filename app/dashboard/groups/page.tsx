import React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import GroupsList from "@/app/components/dashboard/lists/GroupsList";
import GroupCategoriesList from "@/app/components/dashboard/lists/GroupCategoriesList";
import GroupProvider from "@/app/lib/providers/GroupProvider";
import { getCategories } from "@/app/lib/supabase/methods/categories";
import { getGroups } from "@/app/lib/supabase/methods/groups";
import GroupFormDialog from "@/app/components/dashboard/dialogs/GroupFormDialog";
import { getDictionary } from "@/app/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Spdx - Category Groups",
  description: "",
};

const GroupsPage = async () => {
  const groups = await getGroups();
  const categories = await getCategories();
  const d = await getDictionary();

  return (
    <PageContainer title={d.entities.groups.name}>
      <GroupProvider>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <GroupsList groups={groups} />
          </Grid>
          <Grid item xs={12} md={6}>
            <GroupCategoriesList categories={categories} />
          </Grid>
        </Grid>
        <GroupFormDialog />
      </GroupProvider>
    </PageContainer>
  );
};

export default GroupsPage;
