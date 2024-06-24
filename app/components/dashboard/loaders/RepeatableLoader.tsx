import React from "react";
import { Skeleton } from "@mui/material";

const RepeatableLoader = ({
  items,
  width,
  height,
}: {
  items: number;
  width: number | string;
  height: number | string;
}) => {
  let list = [];
  for (let i = 0; i < items; i++) {
    list.push(
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        sx={{ margin: "10px" }}
        animation="wave"
      />
    );
  }
  return list;
};

export default RepeatableLoader;
