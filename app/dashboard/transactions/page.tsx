'use client'
import { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Typography,
  Button,
  SvgIcon,
  FormControl,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CategoryDAO } from "@/types/entities";
import { getCategories } from "@/lib/supabase-client";

const TransactionsPage = () => {
    const [value, setValue] = useState<number>(0);
    const [category, setCategory] = useState<number>(0);
    const [categories, setCategories] = useState<CategoryDAO[]>([]);

  useEffect(() => {
    try {
      getCategories().then((data) => setCategories(data as CategoryDAO[]));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h4">Lançamentos</Typography>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <AddRoundedIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Add
          </Button>
        </Stack>
        <Card sx={{p: 2}}>
            <CardHeader title="Novo lançamento" />
            <CardContent>
                <Stack direction="row">
                    <Grid container spacing={3}>
                        <Grid xs={12} md={4}>
                            <TextField name="tsx_value" label="Valor" required value={value} />
                        </Grid>
                    
                        <Grid xs={12} md={4}>
                            <TextField name="tsx_value" label="Valor" required value={value} />
                        </Grid>
                    
                        <Grid xs={12} md={4}>
                            <TextField name="tsx_value" label="Valor" required value={value} />
                        </Grid>
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
        
      </Stack>
    </Container>
  );
};

export default TransactionsPage;
