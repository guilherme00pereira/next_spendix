import React from "react";
import Skeleton from "@mui/material/Skeleton";

const Loading = () => {
  return <Skeleton variant="rectangular" width={400} height={400} sx={{ margin: "10px" }} animation="wave" />;
};

export default Loading;
