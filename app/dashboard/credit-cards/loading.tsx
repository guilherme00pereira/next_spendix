import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const Loading = () => {
    const list = []
    for (let i = 0; i < 5; i++) {
        list.push(
            <Skeleton
                variant="rectangular"
                width={400}
                height={100}
                sx={{ margin: "10px" }}
                animation="wave"
            />
        );
    }
    return list;
};

export default Loading;