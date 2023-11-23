"use client";

import Link from 'next/link';
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: theme.palette.primary.light }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Box
                sx={{
                  maxWidth: { xs: 400, lg: 475 },
                  margin: { xs: 2.5, md: 3 },
                  "& > *": {
                    flexGrow: 1,
                    flexBasis: "50%",
                  },
                }}
              >
                <Link href="/dashboard" passHref>
                  <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                    Sign in
                  </Button>
                </Link>
              
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
