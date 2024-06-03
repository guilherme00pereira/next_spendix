import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface ISidebarItemsProps {
    title: string;
    icon: JSX.Element;
    link: string;
}

const SidebarMenuItem = ({title, icon, link}: ISidebarItemsProps) => {
    return (
        <ListItemButton LinkComponent="a" href={link}>
          <ListItemIcon>
              {icon}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
    );
};

export default SidebarMenuItem;