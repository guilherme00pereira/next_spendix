import React from "react";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { ICategoryListItemProps } from "@/types/interfaces";
import Chip from "@mui/material/Chip";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";
import {
  InfoActionButton,
  DangerActionButton,
  PrimaryActionButton,
  RegularLink,
  ListItem,
} from "@/app/components/dashboard/commonStyledComponents";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import TrendSignal from "../../widgets/stats/TrendSignal";

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

const CategoriesListItem = ({ category, handleEdit, handleConfirmDelete, isSubCategory }: ICategoryListItemProps) => {
  const router = useRouter();
  const { setShowChart } = useCategoriesPageContext();

  return (
    <ListItem direction={{xs: "column", md: "row"}} justifyContent="space-between">
      {isSubCategory && (
        <Box sx={{ width: "50px" }}>
          <SubdirectoryArrowRightOutlinedIcon fontSize="small" />
        </Box>
      )}
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
        <Stack direction="row" spacing={1}>
          <PrimaryActionButton
            size="small"
            variant="text"
            onClick={() => router.push(`/dashboard/categories/${category.slug}/transactions`)}
          >
            <BarChartOutlinedIcon />
          </PrimaryActionButton>
          <InfoActionButton size="small" variant="text" onClick={() => handleEdit(category.id)}>
            <EditOutlinedIcon />
          </InfoActionButton>
          <DangerActionButton
            size="small"
            variant="text"
            onClick={() => handleConfirmDelete(category.id, category.name)}
          >
            <DeleteOutlinedIcon />
          </DangerActionButton>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CategoriesListItem;
