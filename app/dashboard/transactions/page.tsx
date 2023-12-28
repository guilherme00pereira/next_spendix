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
import AddNewTransactionCard from "@/components/dashboard/transactions/AddNewTransactionCard";

const TransactionsPage = () => {
    const [showAdd, setShowAdd] = useState<boolean>(false);
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
            onClick={() => setShowAdd(!showAdd)}
          >
            Add
          </Button>
        </Stack>
          {showAdd && (
              <AddNewTransactionCard toggle={showAdd} action={setShowAdd} />
          )}

      </Stack>
    </Container>
  );
};

export default TransactionsPage;
