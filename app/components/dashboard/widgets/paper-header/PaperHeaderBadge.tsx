"use client";
import React from 'react';
import { IPaperHeaderBadgeType } from '@/types/interfaces';
import Badge from '@mui/material/Badge';


const PaperHeaderBadge = ({content, color}: IPaperHeaderBadgeType) => {
    return (
        <Badge badgeContent={content} color={color} sx={{marginTop: "-5px"}} />
    );
};

export default PaperHeaderBadge;