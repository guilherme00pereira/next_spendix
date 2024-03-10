import React from 'react';
import {Skeleton} from "@mui/material";

const WalletItemsLoader = () => {
  return (
    <>
      <Skeleton variant="rectangular" width={300} height={150} sx={{margin: "10px"}} animation="wave" />
      <Skeleton variant="rectangular" width={300} height={150} sx={{margin: "10px"}} animation="wave" />
      <Skeleton variant="rectangular" width={300} height={150} sx={{margin: "10px"}} animation="wave" />
    </>
  );
};

export default WalletItemsLoader;