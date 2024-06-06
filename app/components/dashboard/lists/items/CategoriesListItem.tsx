import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { RegularLink, ListItem } from "@/app/components/dashboard/commonStyledComponents";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import TrendSignal from "../../widgets/stats/TrendSignal";
import { CategoryWithStatsType } from "@/types/entities";
import CategoryActionButtons from "../../widgets/buttons/CategoryActionButtons";

const getTypeColor = (type: string) => {
  switch (type) {
    case "Receita":
      return "success";
    case "Despesa":
      return "secondary";
    default:
      return "primary";
  }
};

const CategoriesListItem = ({ category }: { category: CategoryWithStatsType }) => {
  const { setShowChart } = useCategoriesPageContext();

  return (
    <ListItem direction={{ xs: "column", md: "row" }} justifyContent="space-between">
      <Box sx={{ flexGrow: 1 }}>
        <RegularLink href={`/dashboard/categories/${category.slug}`} underline="none" variant="subtitle2">
          {category.name}
        </RegularLink>
      </Box>
      <Box sx={{ pr: "6em" }}>
        <TrendSignal current={category.current_balance} previous={category.previous_balance} />
      </Box>
      <Box sx={{ pr: "3em" }}>
        <Chip
          label={category.type}
          size="small"
          variant="outlined"
          color={getTypeColor(category.type)}
          sx={{ borderRadius: "4px" }}
        />
      </Box>
      <Box>
        <CategoryActionButtons category={category} />
      </Box>
    </ListItem>
  );
};

export default CategoriesListItem;
