'use client'
import { CategoryType } from "@/types/entities";
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Stack } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";

const CategoryDetailsPageSelect = ({categories}: {categories: CategoryType[]}) => {
    const router = useRouter();

    const handleChangeSelect = (event: SelectChangeEvent<HTMLInputElement>) => {
        const categoryId = event.target.value;
        router.push(`/dashboard/categories/${categoryId}`);
      };

    return (
        <PaperContainer sx={{mb: 4}}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <FormControl sx={{ width: "40%" }} size="small">
            <InputLabel>Categorias</InputLabel>
            <Select
              name="category_id"
              size="small"
              onChange={(e: SelectChangeEvent<HTMLInputElement>) => handleChangeSelect(e)}
              input={<OutlinedInput label="Trocar Categoria" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 500,
                    width: 250,
                  },
                },
              }}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.slug}>
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        </PaperContainer>
    );
};

export default CategoryDetailsPageSelect;