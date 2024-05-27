'use client'
import { CategoryType } from "@/types/entities";
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";

const CategoryDetailsPageSelect = ({categories}: {categories: CategoryType[]}) => {
    const router = useRouter();

    const handleChangeSelect = (event: SelectChangeEvent<HTMLInputElement>) => {
        const categoryId = event.target.value;
        router.push(`/dashboard/categories/${categoryId}`);
      };

    return (
          <FormControl sx={{ width: "40%" }} size="small">
            <InputLabel>Categorias</InputLabel>
            <Select
              name="category_id"
              size="small"
              onChange={(e: SelectChangeEvent<HTMLInputElement>) => handleChangeSelect(e)}
              input={<OutlinedInput label="Categorias" />}
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
    );
};

export default CategoryDetailsPageSelect;