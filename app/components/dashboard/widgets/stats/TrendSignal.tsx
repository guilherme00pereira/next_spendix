import React from "react";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { calculatePercentageFromPrevious } from "@/app/lib/functions";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface TrendComponentProps {
    diff: number;
    color: string;
    children: React.ReactNode;
    }

const TrendComponent = ({ diff, color, children }: TrendComponentProps) => {
    return (
        <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="body2" color={color}>{diff.toFixed(2)}%</Typography>
            {children}
        </Stack>
    );
}

const TrendSignal = ({ current, previous }: { current: number | null; previous: number | null }) => {
  if (!current || !previous) return null;
  const diff = calculatePercentageFromPrevious(current, previous);
  console.log(diff);

  if (diff > 10)
    return (
      <TrendComponent diff={diff} color="success.main">
        <TrendingUpOutlinedIcon color="success" />
      </TrendComponent>
    );
  if (diff < -10) return (
    <TrendComponent diff={diff} color="error.main">
    <TrendingDownOutlinedIcon color="error" />
    </TrendComponent>
    );

  return (
    <TrendComponent diff={diff} color="info.main">
        <TrendingFlatOutlinedIcon color="info" />
    </TrendComponent>
  );
};

export default TrendSignal;
