import React from "react";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { calculatePercentageFromPrevious } from "@/app/lib/functions";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface ITrendComponentProps {
  variation: number;
  showVariation?: boolean;
  color: string;
  children: React.ReactNode;
}

interface ITrendSignalProps {
  current: number | null;
  previous: number | null;
  showVariation?: boolean;
}

const TrendComponent = ({ variation, showVariation, color, children }: ITrendComponentProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      {showVariation && (
        <Typography variant="body2" color={color}>
          {variation.toFixed(2)}%
        </Typography>
      )}
      {children}
    </Stack>
  );
};

const TrendSignal = ({ current, previous, showVariation }: ITrendSignalProps) => {
  if (!current || !previous) return null;
  const variation = calculatePercentageFromPrevious(current, previous);

  if (variation > 10)
    return (
      <TrendComponent variation={variation} color="success.main" showVariation={showVariation}>
        <TrendingUpOutlinedIcon color="success" />
      </TrendComponent>
    );
  if (variation < -10)
    return (
      <TrendComponent variation={variation} color="error.main" showVariation={showVariation}>
        <TrendingDownOutlinedIcon color="error" />
      </TrendComponent>
    );

  return (
    <TrendComponent variation={variation} color="info.main" showVariation={showVariation}>
      <TrendingFlatOutlinedIcon color="info" />
    </TrendComponent>
  );
};

export default TrendSignal;
