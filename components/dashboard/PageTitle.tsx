import { Stack, Typography } from "@mui/material";
import React from "react";

const PageTitle = ({title}: {title: string}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      <Typography variant="h2" fontSize="1.5em" color="primary">
        {title}
      </Typography>
    </Stack>
  );
};

export default PageTitle;
